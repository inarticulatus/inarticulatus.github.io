---
title: 'ML From Scratch: Gradient Descent to Gradient Boosting'
description: 'Implementing core ML algorithms from first principles using only NumPy'
pubDate: 'Dec 12 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 
    - research
    - ML
---

## Why Build ML From Scratch?

Anyone can call `sklearn.fit()`. But can you explain *why* gradient boosting works? Can you derive the update rule for logistic regression? This project forced me to understand the math, not just the API.

## What I Built

Seven core algorithms, implemented using only NumPy:

### Linear Models
- **Linear Regression**: Both closed-form (Normal Equation) and gradient descent
- **Ridge & Lasso**: L2/L1 regularization with coordinate descent for Lasso
- **Logistic Regression**: Cross-entropy loss with Newton-Raphson optimization

### Tree-Based Models
- **Decision Trees (CART)**: Gini impurity and entropy splitting criteria
- **Random Forest**: Bagging with feature subsampling
- **Gradient Boosted Trees**: Residual fitting with shrinkage
- **XGBoost-style GBM**: Second-order Taylor expansion and leaf regularization

## The Math That Matters

### Gradient Descent Derivation
For linear regression, the gradient of MSE loss:

$$\nabla_\theta L = -\frac{1}{n} X^T(y - X\theta)$$

This simple formula powers everything from linear regression to deep learning.

### Why XGBoost is Different
Standard gradient boosting fits residuals. XGBoost uses a **second-order Taylor expansion**:

$$L \approx \sum_i [g_i f(x_i) + \frac{1}{2} h_i f(x_i)^2]$$

Where $g_i$ is the gradient and $h_i$ is the Hessian. This leads to better splits and built-in regularization.

## Benchmarks

I tested my implementations against sklearn on standard datasets:

| Algorithm | My Implementation | sklearn | Accuracy Gap |
|:---|:---:|:---:|:---:|
| Logistic Regression | 91.2% | 91.5% | 0.3% |
| Random Forest | 94.8% | 95.1% | 0.3% |
| Gradient Boosting | 96.1% | 96.8% | 0.7% |
| XGBoost-style | 96.5% | 97.2% | 0.7% |

Less than 1% gap — and I can explain every line of code.

## Key Learnings

1. **Regularization is geometry** — L2 shrinks toward origin, L1 induces sparsity by hitting axes
2. **Trees are greedy** — they find locally optimal splits, not globally optimal
3. **Boosting reduces bias** — each tree corrects the previous, unlike bagging which reduces variance

## What's Next

Extending to neural networks: backpropagation, batch normalization, and attention mechanisms — all from scratch.

## Tech Stack

`NumPy` `Matplotlib` `Pytest`
