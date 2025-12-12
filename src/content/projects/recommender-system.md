---
title: 'Real-time E-commerce Recommender System'
description: 'Building a scalable recommendation engine with Lambda Architecture, Kafka, Flink, and Airflow'
pubDate: 'Dec 12 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: data-engineering
---

## The Challenge

How do you recommend products to millions of users in real-time while processing terabytes of clickstream data daily? This project tackles exactly that — building a production-grade recommendation system that handles both historical batch processing and real-time personalization.

## Architecture: Lambda at Scale

I chose the **Lambda Architecture** to get the best of both worlds:

- **Speed Layer (Flink)**: Processes real-time clicks to update session-based features instantly. When a user views a product, their recommendations update within seconds.
- **Batch Layer (Spark)**: Crunches historical data overnight to train deep learning models and compute heavy aggregates like "users who bought X also bought Y."
- **Serving Layer (Feast)**: A unified Feature Store that ensures training and inference see the exact same feature definitions — eliminating the dreaded training-serving skew.

## The Recommendation Pipeline

I implemented a classic **Two-Stage** approach used by companies like YouTube and Alibaba:

### Stage 1: Candidate Retrieval
- **Two-Tower Neural Network**: Separate embeddings for users and items
- **Vector Database (Milvus)**: Serves 1M+ item embeddings with sub-10ms latency
- **Output**: ~100 candidate items from 1M+ catalog

### Stage 2: Ranking
- **DeepFM**: Deep Factorization Machines combining wide (memorization) and deep (generalization) learning
- **Features**: Real-time session clicks + historical purchase patterns
- **Output**: Final ranked list of ~10 recommendations

## Orchestration with Airflow

One of the key production components is the **Airflow DAG ecosystem**:

- **Daily Feature Pipeline**: Computes user-30-day-history features
- **Weekly Model Retraining**: Triggers Two-Tower and DeepFM training jobs with MLflow tracking
- **Drift Detection**: Monitors KL Divergence between training and production distributions

## Key Learnings

1. **Feature stores are non-negotiable** for ML systems at scale. Feast eliminated an entire class of bugs.
2. **Two-stage retrieval is the standard** for a reason — you can't rank what you can't retrieve fast.
3. **Statistical monitoring matters** — I integrated PSI (Population Stability Index) to catch data drift before it impacts recommendations.

## Tech Stack

`Kafka` `Flink` `Spark` `Feast` `Milvus` `Airflow` `Docker` `Python`
