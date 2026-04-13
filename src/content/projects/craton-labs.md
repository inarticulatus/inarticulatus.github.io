---
title: 'Compliance-First RAG: What Generic RAG Gets Wrong'
description: 'Building a compliance-ready retrieval-augmented generation system for regulated professional services — and why document-level access controls, immutable audit logs, and data residency matter more than retrieval quality'
pubDate: 'Apr 13 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 
    - AI engineering
    - projects
---

## The Problem with "Enterprise RAG"

Every RAG tutorial shows the same thing: ingest some PDFs, embed them, query with an LLM, get answers. It works. The demo is impressive. And then you try to sell it to a compliance officer at a financial services firm, and they ask four questions that shut down the conversation:

1. "Who can access what?"
2. "Can you prove what was asked and answered, when?"
3. "Where does my data go?"
4. "Will this be used to train your model?"

A generic RAG implementation has no good answers to any of these. That's not a gap you patch with a feature. It's an architectural constraint that has to be built from day one.

This post is about the RAG system I built for Craton Labs — a compliance-ready AI engine for regulated professional services firms. The retrieval architecture matters, but it's not the differentiator. The differentiator is everything around it.

## Architecture Overview

```
Documents → Ingestion → Storage → Retrieval → LLM → Response
                ↓           ↓         ↓
           Audit Log   RBAC    Immutable Query Log
                ↓           ↓
           Data Residency ← Compliance Layer
```

The standard RAG pipeline is one component in a larger system. Everything else exists to satisfy regulatory requirements that regulated firms can't waive.

## The Retrieval Layer

The core retrieval is hybrid — not because it's theoretically interesting, but because professional documents demand it.

**Dense retrieval** (vector embeddings) handles semantic similarity. "What does this circular say about liquidity requirements?" returns relevant content even when the exact words aren't present.

**Sparse retrieval** (BM25) handles exact matches. Regulation numbers, section citations, proper nouns — these fail in pure vector search. "Article 17(3) of DORA" needs exact keyword matching.

**Cross-encoder re-ranking** improves precision. The retriever returns 50 candidates; a cross-encoder scores each against the query, and the top 5 go to the LLM.

```
Query → Embedding → Vector Search (top 50)
     → BM25 → Keyword Results
     → Reciprocal Rank Fusion → Combined 50
     → Cross-Encoder Reranking → Top 5 → LLM → Answer
```

For professional documents, this combination measurably outperforms vector-only retrieval. I verified this against 90 days of RBI and SEBI circulars — specific regulatory questions require specific term matching that semantic search alone can't provide reliably.

**Storage is swappable by design.** pgvector for early development (fast, cheap, sufficient to 10M+ chunks). Weaviate for enterprise and on-premise deployments where data residency is a contractual obligation. The retrieval layer doesn't change when you swap storage — that's an explicit architectural constraint, not an afterthought.

## Document-Level Access Controls

Folder-level permissions are what most RAG systems implement. They're simple to reason about and completely inadequate for regulated firms.

A compliance officer at an asset management firm might have access to DORA-related documents but not to M&A due diligence content. A junior analyst might see aggregated regulatory alerts but not raw client portfolios. A legal team needs per-document visibility that a folder structure can't express cleanly.

Document-level RBAC means permissions are attached to individual chunks, not folders. The query engine filters results against the caller's permission set before returning anything. This happens at the retrieval layer, not as a post-processing step — unauthorized documents never appear in the candidate set.

Implementation: every chunk carries metadata including the document ID, access tier, and applicable regulatory domain. The retrieval query includes a mandatory filter clause. Postgres row-level security handles the enforcement; Weaviate has native filtering that maps to the same model.

## Immutable Audit Logging

Every query is logged before it returns. Not selectively. Not when it's convenient. Every query.

The log captures:
- Caller identity (from authentication token)
- Timestamp (server time, not client time)
- Query text
- Retrieved document IDs
- Response (truncated at a length threshold)
- Model used
- Latency

The logging table is append-only. No UPDATE or DELETE permissions exist at the application level. The schema uses a trigger to enforce this, and access to the logs is a separate role that only compliance officers hold.

This isn't just good practice — it's what regulatory auditors ask for. When a regulator asks "show me what this user queried in Q3," the answer is a SQL query away, not a forensics project.

## Data Residency Architecture

India-first deployments run on AWS ap-south-1 (Mumbai). EU deployments run on AWS eu-central-1 (Frankfurt). These are not configuration flags — they're infrastructure boundaries enforced at the network layer.

For EU clients, this matters because of GDPR Article 28 requirements and DORA's ICT third-party provider provisions. A firm can't use a system where data processing happens on US infrastructure without explicit contractual commitments and DPAs that satisfy their regulator.

For the highest-sensitivity deployments — tier-two banks, for example — on-premise deployment with self-hosted Mistral is the only option. The model abstraction layer handles this without requiring product changes: swap the API call to a local endpoint, and the rest of the system continues unchanged.

## What Makes It Compliance-First vs Generic RAG

Generic RAG + a document upload feature + "we don't train on your data" checkbox is not compliance-first. It's compliance-adjacent.

Compliance-first means:
- **Document-level permissions** are the model, not an add-on
- **Audit logs are immutable** and exportable in auditor-readable formats
- **Data residency is enforced** at the infrastructure layer, not promised in a DPA
- **No training on client data** is a contractual commitment with technical enforcement
- **Client-controlled key management** is available for the highest-sensitivity deployments

These aren't features. They're the product for the target buyer. A compliance officer at a mid-sized financial firm is evaluating whether this system satisfies their regulatory obligations — not whether it's cheaper than the consultant they're currently using.

## Key Learnings

1. **Retrieval quality is necessary but not sufficient.** The hybrid approach matters, but it's the baseline expectation. The compliance layer is the differentiator that actually closes deals in regulated markets.

2. **Swappable storage isn't optional for enterprise.** pgvector works fine for the first million chunks. Weaviate's data control features are what enterprise procurement demands. Building the abstraction from day one costs nothing; retrofitting it later costs months.

3. **The audit log is a product decision, not an infrastructure decision.** If you build it after the fact, you'll have gaps. Design it with the schema first, then build everything else around it.

4. **Regulatory requirements are a forcing function for good architecture.** DORA, GDPR, EU AI Act — these aren't burdens. They specify exactly what regulated firms need, which tells you exactly what to build.

## Tech Stack

`pgvector` `Weaviate` `Unstructured.io` `LlamaParse` `LlamaIndex` `FastAPI` `Supabase Auth` `PostgreSQL` `Claude API` `Mistral` `AWS`
