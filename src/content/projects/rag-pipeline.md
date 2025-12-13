---
title: 'Production RAG Pipeline for Document Intelligence'
description: 'Building an enterprise-grade Retrieval-Augmented Generation system with dbt, Qdrant, and LangChain'
pubDate: 'Dec 12 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 
    - data engineering
    - projects
---

## The Problem

Enterprise knowledge is trapped in PDFs, wikis, and Slack threads. Traditional search returns documents — but users want *answers*. This project builds a **RAG (Retrieval-Augmented Generation)** pipeline that ingests 10K+ documents and provides intelligent Q&A with citations.

## Architecture Overview

```
Documents → Chunking → Embeddings → Vector DB → Retrieval → Reranking → LLM → Answer
```

Each component is carefully designed for production reliability.

## The Data Pipeline

### Document Ingestion
- **Unstructured.io** handles complex PDFs with tables, images, and multi-column layouts
- Extracted text is cleaned and normalized before chunking

### Chunking Strategy
After extensive testing, I settled on **recursive character splitting** with:
- 512 tokens per chunk
- 50 token overlap
- Preserved metadata: source file, page number, section headers

### dbt Transformation Layer
One of the key production additions was a **dbt transformation layer** for:
- Document metadata aggregation (chunks per doc, avg chunk length)
- Evaluation metrics computation (faithfulness scores over time)
- Data quality checks (null chunks, encoding issues)

## Retrieval: Hybrid is the Answer

Pure semantic search misses exact keyword matches. Pure BM25 misses semantic similarity. I implemented **hybrid retrieval**:

1. **Dense retrieval**: Sentence-Transformers embeddings → Qdrant ANN search
2. **Sparse retrieval**: BM25 keyword matching
3. **Fusion**: Reciprocal Rank Fusion (RRF) to combine results

### Cross-Encoder Reranking
The hybrid retriever returns 50 candidates. A cross-encoder (`ms-marco-MiniLM`) reranks them to the final top 5, improving **answer precision by 25%**.

## Evaluation: RAGAS Framework

You can't improve what you don't measure. I integrated **RAGAS** for automated evaluation:

- **Faithfulness**: Does the answer stay grounded in context?
- **Answer Relevance**: Does it actually address the question?
- **Context Precision**: Are the retrieved chunks useful?

This runs nightly, catching regressions before they reach users.

## Key Learnings

1. **Chunking is underrated** — bad chunks = bad retrieval = bad answers
2. **Hybrid search beats pure dense** for enterprise docs with technical terminology
3. **dbt for ML pipelines** works surprisingly well for metrics and metadata management

## Tech Stack

`LangChain` `Qdrant` `dbt` `Sentence-Transformers` `FastAPI` `RAGAS` `Airflow`
