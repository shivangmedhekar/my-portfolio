#!/usr/bin/env python3
"""
Quick Start Script
==================
Test your embedding setup with a simple example.

This script will:
1. Check your environment configuration
2. Generate a test embedding
3. Store it in Supabase (if configured)
4. Search for similar content

Run: python quickstart.py
"""

import argparse
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def resolve_resume_path() -> tuple[Path, bool]:
    """Resolve resume path from env or use project default."""
    env_resume_path = os.getenv("RESUME_PATH", "").strip()
    base_dir = Path(__file__).resolve().parent

    if env_resume_path:
        raw_path = Path(env_resume_path)
    else:
        # Default to repository-level data folder
        raw_path = base_dir.parent / "data" / "Shivang_Medhekar_Resume.pdf"

    if raw_path.is_absolute():
        resolved = raw_path
    else:
        resolved = (base_dir / raw_path).resolve()

    return resolved, bool(env_resume_path)


def check_environment():
    """Check if environment is properly configured"""
    print("\n" + "="*80)
    print("ENVIRONMENT CHECK")
    print("="*80 + "\n")

    issues = []

    # Check provider
    provider = os.getenv("EMBEDDING_PROVIDER", "sentence-transformers")
    print(f"✓ Embedding Provider: {provider}")

    # Check provider-specific requirements
    if provider == "openai":
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            issues.append("OPENAI_API_KEY is not set (required for OpenAI provider)")
            print("✗ OPENAI_API_KEY: Not set")
        else:
            print(f"✓ OPENAI_API_KEY: ...{api_key[-4:]}")

        model = os.getenv("OPENAI_EMBEDDING_MODEL", "text-embedding-3-small")
        print(f"✓ OpenAI Model: {model}")
    elif provider == "gemini":
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            issues.append("GEMINI_API_KEY is not set (required for Gemini provider)")
            print("✗ GEMINI_API_KEY: Not set")
        else:
            print(f"✓ GEMINI_API_KEY: ...{api_key[-4:]}")

        model = os.getenv("GEMINI_EMBEDDING_MODEL", "gemini-embedding-001")
        dimensions = os.getenv("GEMINI_EMBEDDING_DIMENSIONS", "384")
        print(f"✓ Gemini Model: {model}")
        print(f"✓ Gemini Dimensions: {dimensions}")
    else:
        model = os.getenv("ST_MODEL", "all-MiniLM-L6-v2")
        print(f"✓ Sentence Transformer Model: {model}")

    # Check resume path
    resume_path, from_env = resolve_resume_path()
    if resume_path.exists() and resume_path.is_file():
        source_label = "from RESUME_PATH" if from_env else "default"
        print(f"✓ Resume Path ({source_label}): {resume_path}")
    else:
        path_source = "RESUME_PATH" if from_env else "default path"
        issues.append(f"Resume file not found ({path_source}): {resume_path}")
        print(f"✗ Resume Path: Not found at {resume_path}")

    # Check Supabase (optional for testing embeddings only)
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_ANON_KEY")

    if not supabase_url or not supabase_key:
        print("\n⚠️  Supabase credentials not set (optional for testing)")
        print("   You can still generate embeddings, but won't be able to store them")
    else:
        print(f"✓ SUPABASE_URL: {supabase_url}")
        print(f"✓ SUPABASE_KEY: ...{supabase_key[-4:]}")
        if supabase_key.startswith("sb_publishable_"):
            print("⚠️  SUPABASE_KEY looks like a publishable key.")
            print("   For this Python setup, use anon public JWT key (starts with 'eyJ') or service role key.")

    print()

    if issues:
        print("❌ Issues found:")
        for issue in issues:
            print(f"   - {issue}")
        print("\nPlease fix the issues above and try again.")
        return False

    print("✅ Environment looks good!")
    return True


def test_embedding_generation():
    """Test generating embeddings"""
    print("\n" + "="*80)
    print("TESTING EMBEDDING GENERATION")
    print("="*80 + "\n")

    try:
        from embedding_to_supabase import get_embedder_from_env

        # Initialize embedder
        embedder = get_embedder_from_env()

        # Test texts
        test_texts = [
            "Artificial intelligence is transforming technology",
            "Machine learning models can predict patterns in data",
            "Natural language processing enables human-computer interaction"
        ]

        print(f"Generating embeddings for {len(test_texts)} test documents...")
        embeddings = embedder.generate_embeddings_batch(test_texts)

        print(f"✅ Success!")
        print(f"   Generated {len(embeddings)} embeddings")
        print(f"   Dimensions: {len(embeddings[0])}")
        print(f"   Provider: {embedder.provider}")
        model_name = getattr(embedder, "model", getattr(embedder, "model_name", "unknown"))
        print(f"   Model: {model_name}")

        # Show sample
        print(f"\nSample embedding (first 10 values):")
        print(f"   {embeddings[0][:10]}")

        return True, embeddings, test_texts

    except Exception as e:
        print(f"❌ Error generating embeddings: {str(e)}")
        print("\nTroubleshooting:")
        if "OPENAI_API_KEY" in str(e):
            print("  - Make sure OPENAI_API_KEY is set in your .env file")
        elif "GEMINI_API_KEY" in str(e):
            print("  - Make sure GEMINI_API_KEY is set in your .env file")
        elif "sentence" in str(e).lower():
            print("  - Install sentence-transformers: pip install sentence-transformers")
        else:
            print(f"  - {str(e)}")
        return False, None, None


def store_embeddings_in_supabase(embeddings, texts, source_label: str = "quickstart", table_name: str = "embeddings"):
    """Store embeddings in Supabase and run a quick similarity test."""
    print("\n" + "="*80)
    print("TESTING SUPABASE STORAGE")
    print("="*80 + "\n")

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_ANON_KEY")

    if not supabase_url or not supabase_key:
        print("⚠️  Skipping Supabase test (credentials not set)")
        print("   This is fine for local testing!")
        return False

    try:
        from embedding_to_supabase import SupabaseEmbeddingStore

        store = SupabaseEmbeddingStore()

        # Prepare data
        items = [
            {
                "text": text,
                "embedding": embedding,
                "metadata": {"source": source_label, "test": source_label == "quickstart", "index": i}
            }
            for i, (text, embedding) in enumerate(zip(texts, embeddings))
        ]

        # Try to store
        print(f"Storing {len(items)} embeddings in Supabase...")
        results = store.store_embeddings_batch(table_name, items)

        print(f"✅ Success!")
        print(f"   Stored {len(results)} embeddings")
        print(f"   Table: {table_name}")

        # Try a search
        print(f"\nTesting semantic search...")
        query_embedding = embeddings[0]  # Use first embedding as query

        similar = store.search_similar(
            table_name=table_name,
            query_embedding=query_embedding,
            limit=3,
            threshold=0.5
        )

        print(f"✅ Found {len(similar)} similar documents")

        return True

    except Exception as e:
        print(f"❌ Error with Supabase: {str(e)}")
        print("\nTroubleshooting:")
        print("  - Make sure you've created the embeddings table (see README.md)")
        print("  - Check that your SUPABASE_URL and SUPABASE_KEY are correct")
        print(f"  - Error details: {str(e)}")
        return False


def read_pdf_text(pdf_path: Path) -> str:
    """Extract text from a PDF file."""
    try:
        from pypdf import PdfReader
    except ImportError as exc:
        raise ImportError("pypdf is required for resume mode. Run: pip install pypdf") from exc

    reader = PdfReader(str(pdf_path))
    pages = []
    for page in reader.pages:
        page_text = page.extract_text() or ""
        if page_text.strip():
            pages.append(page_text.strip())
    return "\n\n".join(pages).strip()


def chunk_text(text: str, chunk_size: int = 900, overlap: int = 150) -> list[str]:
    """Split text into overlapping chunks."""
    if not text.strip():
        return []

    normalized = " ".join(text.split())
    chunks = []
    start = 0
    text_len = len(normalized)
    while start < text_len:
        end = min(start + chunk_size, text_len)
        chunks.append(normalized[start:end])
        if end >= text_len:
            break
        start = end - overlap
    return chunks


def embed_resume(resume_path: Path, table_name: str = "embeddings", chunk_size: int = 900, overlap: int = 150):
    """Generate and store resume embeddings from a PDF."""
    print("\n" + "="*80)
    print("RESUME EMBEDDING MODE")
    print("="*80 + "\n")

    if not resume_path.exists() or not resume_path.is_file():
        print(f"❌ Resume PDF not found: {resume_path}")
        return False

    if resume_path.suffix.lower() != ".pdf":
        print(f"❌ Resume file must be a PDF. Got: {resume_path}")
        return False

    try:
        from embedding_to_supabase import get_embedder_from_env
    except Exception as exc:
        print(f"❌ Unable to load embedding module: {exc}")
        return False

    print(f"Reading resume PDF: {resume_path}")
    try:
        resume_text = read_pdf_text(resume_path)
    except Exception as exc:
        print(f"❌ Failed to read PDF: {exc}")
        return False

    if not resume_text:
        print("❌ Resume PDF text extraction returned empty content.")
        return False

    chunks = chunk_text(resume_text, chunk_size=chunk_size, overlap=overlap)
    if not chunks:
        print("❌ No text chunks generated from resume.")
        return False

    print(f"Extracted text length: {len(resume_text)} characters")
    print(f"Generated chunks: {len(chunks)} (chunk_size={chunk_size}, overlap={overlap})")

    try:
        embedder = get_embedder_from_env()
        embeddings = embedder.generate_embeddings_batch(chunks)
    except Exception as exc:
        print(f"❌ Error generating resume embeddings: {exc}")
        return False

    print(f"✅ Resume embeddings generated: {len(embeddings)}")
    print(f"   Dimensions: {len(embeddings[0])}")
    print(f"   Provider: {embedder.provider}")

    stored = store_embeddings_in_supabase(
        embeddings=embeddings,
        texts=chunks,
        source_label=f"resume:{resume_path.name}",
        table_name=table_name,
    )
    return bool(stored)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Embedding quickstart with two modes: test or resume."
    )
    parser.add_argument(
        "mode",
        nargs="?",
        choices=["test", "resume"],
        default="test",
        help="Mode to run: 'test' for sample texts, 'resume' for RESUME_PATH PDF.",
    )
    parser.add_argument(
        "--table",
        default="embeddings",
        help="Supabase table name to store vectors (default: embeddings).",
    )
    parser.add_argument(
        "--chunk-size",
        type=int,
        default=900,
        help="Chunk size for resume mode (default: 900).",
    )
    parser.add_argument(
        "--overlap",
        type=int,
        default=150,
        help="Chunk overlap for resume mode (default: 150).",
    )
    return parser.parse_args()


def main():
    """Run embeddings flow."""
    args = parse_args()
    print("\n" + "="*80)
    print("EMBEDDING QUICK START TEST")
    print("="*80)

    # Check environment
    if not check_environment():
        print("\n❌ Environment check failed. Please fix the issues above.")
        sys.exit(1)

    if args.mode == "test":
        success, embeddings, texts = test_embedding_generation()
        if not success:
            print("\n❌ Embedding generation failed. See errors above.")
            sys.exit(1)
        store_embeddings_in_supabase(embeddings, texts, source_label="quickstart", table_name=args.table)
    else:
        resume_path, _ = resolve_resume_path()
        success = embed_resume(
            resume_path=resume_path,
            table_name=args.table,
            chunk_size=args.chunk_size,
            overlap=args.overlap,
        )
        if not success:
            print("\n❌ Resume embedding flow failed.")
            sys.exit(1)

    # Final summary
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    print("\n✅ Embedding generation is working!")

    supabase_configured = os.getenv("SUPABASE_URL") and os.getenv("SUPABASE_KEY")
    if supabase_configured:
        print("✅ Supabase connection is configured")
    else:
        print("⚠️  Supabase is not configured (optional)")

    print(f"\n🎉 Mode completed: {args.mode}")
    print("\nNext steps:")
    print("  1. Run `python main.py test` for sample embeddings")
    print("  2. Run `python main.py resume` for your resume PDF")
    print("  3. Check out embedding_to_supabase.py for the full API")
    print()


if __name__ == "__main__":
    main()
