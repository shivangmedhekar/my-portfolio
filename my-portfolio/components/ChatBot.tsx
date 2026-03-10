'use client';

import { useState, useRef, useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import { Send, X, MessageSquare, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import siteData from '@/data.json';

interface Message {
  id: string;
  text: string;
  role: 'user' | 'assistant';
}

const { chatBot } = siteData;
const SUGGESTIONS = chatBot.suggestions;

const INITIAL_MESSAGE: Message = {
  id: '0',
  role: 'assistant',
  text: chatBot.initialMessage,
};

export default function ChatBot({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ width: 380, height: 720 });
  const [resizing, setResizing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resizeRef = useRef({ startX: 0, startY: 0, startW: 380, startH: 500 });
  const anchorStyle = {
    right: 'max(1rem, env(safe-area-inset-right))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  } as const;

  useEffect(() => {
    if (!isOpen) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  useEffect(() => {
    const defaultHeight = Math.max(420, window.innerHeight - 32);
    setSize((prev) => ({ ...prev, height: defaultHeight }));
  }, []);

  useEffect(() => {
    if (!resizing) return;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeRef.current.startX;
      const dy = e.clientY - resizeRef.current.startY;
      const maxW = Math.max(320, window.innerWidth - 32);
      const maxH = Math.max(420, window.innerHeight - 32);
      const width = Math.min(maxW, Math.max(320, resizeRef.current.startW - dx));
      const height = Math.min(maxH, Math.max(420, resizeRef.current.startH - dy));
      setSize({ width, height });
    };

    const onUp = () => setResizing(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [resizing]);

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
    setLoading(false);
  };

  const startResize = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
    };
    setResizing(true);
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const trimmedText = text.trim();
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmedText };
    const assistantId = (Date.now() + 1).toString();
    const nextMessages = [...messages, userMsg];
    setMessages([...nextMessages, { id: assistantId, role: 'assistant', text: '' }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      });

      if (!response.ok) {
        let message = 'Failed to get response from chat API.';
        try {
          const data = (await response.json()) as { error?: string };
          message = data.error ?? message;
        } catch {
          const textError = await response.text();
          if (textError) message = textError;
        }
        throw new Error(message);
      }

      if (!response.body) {
        throw new Error('Streaming response body is missing.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, text: m.text + chunk } : m))
        );
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId && !m.text.trim()
            ? { ...m, text: 'I could not generate a response right now.' }
            : m
        )
      );
    } catch (error) {
      const fallbackMessage =
        error instanceof Error ? error.message : 'Something went wrong while contacting the assistant.';

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, text: `Error: ${fallbackMessage}` }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Close chat' : `Open ${chatBot.buttonLabel}`}
        className={`fixed z-[70] flex items-center gap-2 h-11 px-5 rounded-full border font-semibold text-base shadow-lg transition-all duration-200 ${
          isOpen
            ? 'opacity-0 pointer-events-none scale-90'
            : 'opacity-100 scale-100 bg-accent text-accent-foreground border-accent/70 hover:opacity-90'
        }`}
        style={anchorStyle}
      >
        <MessageSquare className="w-4 h-4" />
        {chatBot.buttonLabel}
      </button>

      <div
        className={`fixed z-[70] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] flex flex-col rounded-xl border border-border bg-background shadow-2xl origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        } ${resizing ? 'select-none' : 'transition-all duration-200'}`}
        style={{ ...anchorStyle, width: `${size.width}px`, height: `${size.height}px` }}
      >
        <button
          type="button"
          aria-label="Resize chat window"
          onMouseDown={startResize}
          className="absolute top-1.5 left-1.5 z-20 h-4 w-4 rounded-sm border border-border/70 bg-card/70 cursor-nwse-resize"
        />

        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[15px] font-semibold text-foreground">{chatBot.title}</span>
            <span className="font-mono text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={clearChat}
              aria-label="Clear chat"
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-border text-sm text-foreground/85 hover:text-foreground hover:border-border/90 hover:bg-muted/50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {chatBot.clearLabel}
            </button>
            <button
              onClick={onToggle}
              aria-label="Close chat"
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] rounded-lg px-3.5 py-2.5 text-[14px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card border border-border text-foreground'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_code]:rounded [&_code]:bg-muted/50 [&_code]:px-1 [&_code]:py-0.5 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-muted/50 [&_pre]:p-2 [&_a]:underline [&_a]:underline-offset-2">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-lg px-3.5 py-3 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="flex flex-col gap-1.5 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-[13px] text-muted-foreground border border-border/60 hover:border-accent/40 hover:text-foreground rounded-md px-3 py-2 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="px-3 py-3 border-t border-border shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={chatBot.inputPlaceholder}
              disabled={loading}
              className="flex-1 h-9 px-3 rounded-md border border-border bg-card text-foreground text-[14px] placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent/60 transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="h-9 w-9 flex items-center justify-center rounded-md bg-accent text-accent-foreground disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
              aria-label="Send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
