---
title: 'Statistical Experimentation: A/B Testing From First Principles'
description: 'Building a complete experimentation framework — from hypothesis testing to Bayesian inference'
pubDate: 'Dec 12 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: research
---

## The Goal

Data Scientists run A/B tests every day. But how many can derive the sample size formula? Or explain why peeking at results early inflates false positives? This project is about understanding experimentation *deeply*.

## What I'm Building

A complete statistical experimentation framework, from scratch:

### Foundations
- Probability distributions (Bernoulli, Binomial, Normal, t)
- Central Limit Theorem visualizations
- Law of Large Numbers demonstrations

### Hypothesis Testing
- Z-tests and t-tests from first principles
- Power analysis and sample size calculation
- Multiple testing correction (Bonferroni, Benjamini-Hochberg)

### Advanced Topics
- **Sequential Testing**: O'Brien-Fleming boundaries, SPRT
- **CUPED**: Variance reduction using pre-experiment data
- **Bayesian A/B Testing**: Beta-Binomial conjugacy, credible intervals

## The Peeking Problem

One of the most important lessons: **checking results daily inflates false positives**.

If you run an A/A test (no real difference) and check p-values daily for 2 weeks, your actual false positive rate can reach **20%+** instead of the intended 5%.

The solution? **Group sequential designs** with adjusted boundaries, or Bayesian approaches with credible intervals.

## Sample Size Derivation

Most people use calculators. But the formula is elegant:

$$n = \frac{2\sigma^2 (Z_{\alpha/2} + Z_\beta)^2}{\delta^2}$$

Key insight: sample size is **quadratic in effect size**. Detecting a 1% lift needs 4x more samples than a 2% lift.

## CUPED: Getting More from Less

By using pre-experiment data that correlates with the experiment metric, we can reduce variance:

$$Var(Y_{adj}) = Var(Y)(1 - \rho^2)$$

If pre-experiment conversion correlates 0.5 with experiment conversion, we reduce variance by 25% — effectively getting 33% more data for free.

## Why This Matters

Every major tech company runs thousands of experiments per year. Understanding the statistics behind them is critical for:
- Avoiding false discoveries that waste engineering resources
- Detecting real effects faster with proper power analysis
- Making sound business decisions under uncertainty

## Learning Resources

1. "Trustworthy Online Controlled Experiments" by Kohavi et al.
2. "Statistics Done Wrong" by Alex Reinhart
3. Original CUPED paper by Deng et al.

## Tech Stack

`NumPy` `SciPy` `Matplotlib` `Hypothesis`
