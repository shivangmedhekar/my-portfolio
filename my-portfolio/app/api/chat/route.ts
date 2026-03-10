import { NextResponse } from 'next/server';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type MatchEmbeddingRow = {
  id: number;
  text: string;
  metadata: Record<string, unknown>;
  similarity: number;
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const GEMINI_EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL ?? 'gemini-embedding-001';
const GEMINI_EMBEDDING_DIMENSIONS = Number(process.env.GEMINI_EMBEDDING_DIMENSIONS ?? '384');
const GEMINI_CHAT_MODEL = process.env.GEMINI_CHAT_MODEL ?? 'gemini-2.0-flash';
const MAX_CONTEXT_CHUNKS = Number(process.env.RAG_MATCH_COUNT ?? '5');
const MATCH_THRESHOLD = Number(process.env.RAG_MATCH_THRESHOLD ?? '0.45');

export async function POST(req: Request) {
  try {
    if (!GEMINI_API_KEY || !SUPABASE_URL) {
      return NextResponse.json(
        {
          error:
            'Missing environment variables. Required: GEMINI_API_KEY, SUPABASE_URL, and one of SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY.',
        },
        { status: 500 }
      );
    }

    const supabaseKey = SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON_KEY;
    if (!supabaseKey) {
      return NextResponse.json(
        { error: 'Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY.' },
        { status: 500 }
      );
    }

    const body = (await req.json()) as { messages?: ChatMessage[] };
    const messages = body.messages ?? [];
    const latestUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content?.trim();

    if (!latestUserMessage) {
      return NextResponse.json({ error: 'No user message provided.' }, { status: 400 });
    }

    const queryEmbedding = await createEmbedding(latestUserMessage);
    const contextChunks = await fetchContextFromSupabase(queryEmbedding, supabaseKey);

    const contextText = contextChunks.length
      ? contextChunks.map((chunk, index) => `Chunk ${index + 1}: ${chunk.text}`).join('\n\n')
      : 'No relevant context found in vector store.';

    const conversation = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));

    const modelMessages: ChatMessage[] = [
      {
        role: 'system',
        content:
          'You are Shivang\'s portfolio assistant. Answer using the provided context first. If information is missing, say you are not sure and ask the user to contact Shivang directly.',
      },
      {
        role: 'system',
        content: `Relevant resume context:\n${contextText}`,
      },
      ...conversation,
    ];

    const streamResponse = await chatCompletionStream(modelMessages);
    if (!streamResponse.ok) {
      const text = await streamResponse.text();
      throw new Error(`Chat completion failed: ${text}`);
    }

    if (!streamResponse.body) {
      throw new Error('Chat completion stream is empty.');
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const textStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = streamResponse.body!.getReader();
        let buffer = '';
        let emitted = '';

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const rawLine of lines) {
              const line = rawLine.trim();
              if (!line.startsWith('data:')) continue;

              const payload = line.slice(5).trim();
              if (!payload || payload === '[DONE]') continue;

              try {
                const parsed = JSON.parse(payload) as {
                  candidates?: Array<{
                    content?: {
                      parts?: Array<{ text?: string }>;
                    };
                  }>;
                };

                const chunkText = parsed.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
                if (!chunkText) continue;

                let toEmit = chunkText;
                if (chunkText.startsWith(emitted)) {
                  toEmit = chunkText.slice(emitted.length);
                  emitted = chunkText;
                } else {
                  emitted += chunkText;
                }

                if (toEmit) controller.enqueue(encoder.encode(toEmit));
              } catch {
                // Ignore malformed SSE data frames.
              }
            }
          }
        } catch (error) {
          controller.error(error);
          return;
        }

        controller.close();
      },
    });

    return new Response(textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error in /api/chat';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function createEmbedding(input: string): Promise<number[]> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_EMBEDDING_MODEL}:embedContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: `models/${GEMINI_EMBEDDING_MODEL}`,
        content: {
          role: 'user',
          parts: [{ text: input }],
        },
        outputDimensionality: GEMINI_EMBEDDING_DIMENSIONS,
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Embedding request failed: ${text}`);
  }

  const data = (await response.json()) as {
    embedding?: { values?: number[] };
  };
  const embedding = data.embedding?.values;

  if (!embedding) {
    throw new Error('Embedding response did not include a vector.');
  }

  return embedding;
}

async function fetchContextFromSupabase(queryEmbedding: number[], supabaseKey: string): Promise<MatchEmbeddingRow[]> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/match_embeddings`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query_embedding: queryEmbedding,
      match_threshold: MATCH_THRESHOLD,
      match_count: MAX_CONTEXT_CHUNKS,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase match_embeddings RPC failed: ${text}`);
  }

  const rows = (await response.json()) as MatchEmbeddingRow[];
  return rows;
}

async function chatCompletionStream(messages: ChatMessage[]): Promise<Response> {
  const systemMessages = messages.filter((m) => m.role === 'system').map((m) => m.content);
  const dialogue = messages.filter((m) => m.role === 'user' || m.role === 'assistant');

  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_CHAT_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemMessages.join('\n\n') }],
        },
        contents: dialogue.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          temperature: 0.2,
        },
      }),
    }
  );
}
