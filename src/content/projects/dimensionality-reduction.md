---
title: 'Dimensionality Reduction: From PCA to t-SNE'
description: 'Understanding the mathematics of reducing high-dimensional data — from eigendecomposition to manifold learning'
pubDate: 'Dec 12 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 
    - research
    - ML
---

## The Curse of Dimensionality

In high dimensions, everything is far away. Distances become meaningless. Models need exponentially more data. This project is about understanding *how* and *why* dimensionality reduction works.

## What I'm Building

A from-scratch implementation of major dimensionality reduction techniques:

### Linear Methods
- **PCA**: Three derivations — maximum variance, minimum reconstruction error, eigendecomposition
- **Kernel PCA**: Extending PCA to non-linear relationships via the kernel trick

### Manifold Learning
- **t-SNE**: Probability distributions in high and low dimensions, KL divergence minimization
- **UMAP**: Graph-based representation with fuzzy simplicial sets

### Neural Approaches
- **Autoencoders**: Linear (equivalent to PCA) and deep variants
- Visualizing the latent space

## PCA: Three Ways to the Same Answer

The beauty of PCA is that it can be derived three different ways:

1. **Maximum Variance**: Find the direction of maximum spread
2. **Minimum Error**: Minimize reconstruction error
3. **Eigendecomposition**: Principal components are eigenvectors of the covariance matrix

All three lead to the same solution: the top eigenvectors of $X^TX$.

## Why t-SNE Uses t-Distribution

In high dimensions, many points can be "close neighbors." In 2D, there's not enough room for all of them. This is the **crowding problem**.

t-SNE's solution: use a heavy-tailed t-distribution in low dimensions. This allows moderately similar points to be placed far apart without huge penalty.

## The t-SNE Gradient

The gradient has a beautiful interpretation:

$$\frac{\partial C}{\partial y_i} = 4 \sum_j (p_{ij} - q_{ij})(y_i - y_j)(1 + \|y_i - y_j\|^2)^{-1}$$

- $(p_{ij} - q_{ij})$: If positive, points should be closer
- $(y_i - y_j)$: Direction of movement
- The last term: Weighting by current distance

## Linear Autoencoders = PCA

Here's a fact that surprised me: a linear autoencoder with MSE loss learns the same representation as PCA.

With non-linear activations, we can capture more complex structure — but lose the interpretability of principal components.

## Visualization Comparison

I built an interactive comparison tool showing PCA, t-SNE, and UMAP on the same dataset:

- **PCA**: Fast, preserves global structure, struggles with non-linear manifolds
- **t-SNE**: Excellent for clusters, slow, parameters matter a lot
- **UMAP**: Faster than t-SNE, better global structure preservation

## Key Takeaways

1. **PCA is linear** — great for preprocessing, limited for visualization
2. **Perplexity matters** in t-SNE — it controls the effective number of neighbors
3. **UMAP is often the best default** for visualization tasks

## Tech Stack

`NumPy` `Matplotlib` `Scikit-learn (for benchmarking)`
