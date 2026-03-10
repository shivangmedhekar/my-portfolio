#!/usr/bin/env python3
"""Embedding and Supabase helpers used by main.py quickstart."""

from __future__ import annotations

import os
import inspect
from dataclasses import dataclass
from typing import Any

import httpx
from dotenv import load_dotenv
from supabase import create_client


load_dotenv()


def _patch_gotrue_httpx_proxy_compat() -> None:
    """
    Compatibility patch for environments where gotrue passes `proxy=...`
    but installed httpx expects `proxies=...`.
    """
    if "proxy" in inspect.signature(httpx.Client.__init__).parameters:
        return

    try:
        import gotrue._sync.gotrue_base_api as gotrue_base_api
    except Exception:
        return

    original_sync_client = gotrue_base_api.SyncClient

    if getattr(original_sync_client, "__name__", "") == "CompatSyncClient":
        return

    class CompatSyncClient(original_sync_client):  # type: ignore[misc]
        def __init__(self, *args: Any, proxy: str | None = None, **kwargs: Any) -> None:
            if proxy is not None and "proxies" not in kwargs:
                kwargs["proxies"] = proxy
            super().__init__(*args, **kwargs)

    gotrue_base_api.SyncClient = CompatSyncClient


class BaseEmbedder:
    provider: str

    def generate_embeddings_batch(self, texts: list[str]) -> list[list[float]]:
        raise NotImplementedError


@dataclass
class SentenceTransformerEmbedder(BaseEmbedder):
    model_name: str = "all-MiniLM-L6-v2"
    provider: str = "sentence-transformers"

    def __post_init__(self) -> None:
        try:
            from sentence_transformers import SentenceTransformer
        except ImportError as exc:
            raise ImportError(
                "sentence-transformers is not installed. "
                "Run: pip install sentence-transformers torch"
            ) from exc
        self._model = SentenceTransformer(self.model_name)

    def generate_embeddings_batch(self, texts: list[str]) -> list[list[float]]:
        vectors = self._model.encode(texts, convert_to_numpy=True)
        return vectors.tolist()


@dataclass
class OpenAIEmbedder(BaseEmbedder):
    model: str = "text-embedding-3-small"
    provider: str = "openai"

    def __post_init__(self) -> None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY is required for OpenAI embeddings")
        try:
            from openai import OpenAI
        except ImportError as exc:
            raise ImportError("openai package is not installed. Run: pip install openai") from exc
        self._client = OpenAI(api_key=api_key)

    def generate_embeddings_batch(self, texts: list[str]) -> list[list[float]]:
        response = self._client.embeddings.create(model=self.model, input=texts)
        return [item.embedding for item in response.data]


@dataclass
class GeminiEmbedder(BaseEmbedder):
    model: str = "gemini-embedding-001"
    dimensions: int | None = 384
    provider: str = "gemini"

    def __post_init__(self) -> None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY is required for Gemini embeddings")
        self._api_key = api_key
        self._base_url = "https://generativelanguage.googleapis.com/v1beta"

    def _embed_one(self, text: str) -> list[float]:
        payload: dict[str, Any] = {
            "model": f"models/{self.model}",
            "content": {
                "role": "user",
                "parts": [{"text": text}],
            },
        }
        if self.dimensions is not None:
            payload["outputDimensionality"] = self.dimensions

        response = httpx.post(
            f"{self._base_url}/models/{self.model}:embedContent",
            params={"key": self._api_key},
            json=payload,
            timeout=30.0,
        )
        response.raise_for_status()
        data = response.json()
        values = data.get("embedding", {}).get("values")
        if not values:
            raise ValueError(f"Gemini embedding response missing values for model {self.model}")
        return values

    def generate_embeddings_batch(self, texts: list[str]) -> list[list[float]]:
        return [self._embed_one(text) for text in texts]


class SupabaseEmbeddingStore:
    def __init__(self) -> None:
        _patch_gotrue_httpx_proxy_compat()
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        if not url or not key:
            raise ValueError("SUPABASE_URL and SUPABASE_KEY (or SUPABASE_ANON_KEY) must be set")
        if key.startswith("sb_publishable_"):
            raise ValueError(
                "SUPABASE_KEY is a publishable key, which is not accepted by this Supabase Python setup. "
                "Use the anon public JWT key (starts with 'eyJ') or a service role key."
            )
        self.client = create_client(url, key)

    def store_embeddings_batch(self, table_name: str, items: list[dict[str, Any]]) -> list[dict[str, Any]]:
        if not items:
            return []

        payload = []
        for item in items:
            payload.append(
                {
                    "text": item["text"],
                    "embedding": item["embedding"],
                    "metadata": item.get("metadata", {}),
                }
            )

        result = self.client.table(table_name).insert(payload).execute()
        return result.data or []

    def search_similar(
        self,
        table_name: str,
        query_embedding: list[float],
        limit: int = 3,
        threshold: float = 0.5,
    ) -> list[dict[str, Any]]:
        # Uses a standard pgvector RPC pattern if configured in Supabase.
        # If no RPC exists yet, return an empty result instead of failing quickstart.
        rpc_candidates = ["match_documents", "match_embeddings"]
        for fn_name in rpc_candidates:
            try:
                response = (
                    self.client.rpc(
                        fn_name,
                        {
                            "query_embedding": query_embedding,
                            "match_threshold": threshold,
                            "match_count": limit,
                            "table_name": table_name,
                        },
                    )
                    .execute()
                )
                return response.data or []
            except Exception:
                continue
        return []


def get_embedder_from_env() -> BaseEmbedder:
    provider = os.getenv("EMBEDDING_PROVIDER", "sentence-transformers").strip().lower()
    if provider == "openai":
        model = os.getenv("OPENAI_EMBEDDING_MODEL", "text-embedding-3-small")
        return OpenAIEmbedder(model=model)
    if provider == "gemini":
        model = os.getenv("GEMINI_EMBEDDING_MODEL", "gemini-embedding-001")
        dimensions_raw = os.getenv("GEMINI_EMBEDDING_DIMENSIONS", "384").strip()
        dimensions = int(dimensions_raw) if dimensions_raw else None
        return GeminiEmbedder(model=model, dimensions=dimensions)

    model = os.getenv("ST_MODEL", "all-MiniLM-L6-v2")
    return SentenceTransformerEmbedder(model_name=model)
