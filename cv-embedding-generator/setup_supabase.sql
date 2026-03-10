create extension if not exists vector;

create table if not exists public.embeddings (
  id bigserial primary key,
  text text not null,
  embedding vector(384) not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Optional, recommended for vector search speed
create index if not exists embeddings_embedding_idx
on public.embeddings
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Needed if you are using anon key from client
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.embeddings to anon, authenticated;

create or replace function public.match_embeddings (
  query_embedding vector(384),
  match_threshold float default 0.45,
  match_count int default 5
)
returns table (
  id bigint,
  text text,
  metadata jsonb,
  similarity float
)
language sql
stable
as $$
  select
    e.id,
    e.text,
    e.metadata,
    1 - (e.embedding <=> query_embedding) as similarity
  from public.embeddings e
  where 1 - (e.embedding <=> query_embedding) > match_threshold
  order by e.embedding <=> query_embedding
  limit match_count;
$$;

grant execute on function public.match_embeddings(vector(384), float, int) to anon, authenticated;
