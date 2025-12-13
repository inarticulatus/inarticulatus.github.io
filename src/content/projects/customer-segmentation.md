---
title: "The Cost of a Minute: How Delivery Delays Define Customer Value"
description: "A deep dive into e-commerce data using K-Means clustering to uncover the hidden relationship between delivery performance and customer retention."
pubDate: 'Dec 12 2024'
heroImage: '../../assets/blog-placeholder-3.jpg'
category:
    - data science
    - projects
---

# The Pulse of Delivery

In the world of quick commerce, a minute isn't just a measure of time—it's a measure of trust. When a customer taps "Order," they aren't just buying groceries; they are buying a promise. But what happens when that promise is broken? 

For my latest project, **"Customer Segmentation Analysis"**, I didn't just want to group customers by how much they bought. I wanted to understand *why* they bought—and more importantly, why they might stop. By analyzing transactional data from a quick-commerce platform, I set out to answer a simple question: **Does delivery reliability shape the type of customer you attract?**

The answer, as the data revealed, was a resounding yes.

---

## The Approach: Beyond RFM

Traditional customer segmentation often relies on RFM analysis (Recency, Frequency, Monetary value). While powerful, this approach often ignores the *experience* of the customer. I hypothesized that operational metrics—specifically delivery delays—were just as critical as spending habits.

### The Toolkit
-   **Python** for data processing.
-   **Pandas & NumPy** for rigorous data cleaning and manipulation.
-   **Scikit-Learn** for clustering (K-Means) and dimensionality reduction (PCA).
-   **Seaborn & Matplotlib** for bringing the data to life.

### Data Cleaning: The "Messy" Reality
Real-world data is rarely clean. My dataset contained over 50% missing values in some columns, significant outliers in order totals, and negative delivery times (time travel isn't a feature yet!). 

Key steps in the pipeline included:
1.  **Imputation**: Using median/mode strategies for missing data to preserve distributions.
2.  **Outlier Removal**: Capping `order_total` and removing extreme `delivery_delay_minutes` using the Interquartile Range (IQR) method.
3.  **Feature Engineering**: I created a custom feature set that combined transactional behavior with operational reality:
    -   `avg_order_total`: How much they usually spend.
    -   `total_spent`: Lifetime value (log-transformed to handle skew).
    -   `num_orders`: Frequency of purchase.
    -   `avg_delay`: The average operational friction experienced by the customer.

---

## The Discovery: Two Worlds of Customers

After preprocessing and scaling the data, I used **K-Means Clustering** to segment the user base. To find the optimal number of clusters (*k*), I evaluated several metrics:
-   **Silhouette Score**: Measures how distinct the clusters are.
-   **Davies-Bouldin Index**: Measures cluster compactness.
-   **Calinski-Harabasz Score**: Measures variance ratio.

All three metrics pointed to an optimal *k* of **2**. This might seem simple, but the simplicity revealed a stark polarization in the customer base.

### Cluster 0: The "On-Time High-Value" Segment
These are the ideal customers. They order frequently, spend significantly more per order, and—crucially—they experience very few delays. Reliability breeds loyalty.

### Cluster 1: The "Delay-Affected Low-Value" Segment
This group tells a cautionary tale. They order infrequently and spend less. But the defining characteristic? **They suffer from consistent, significant delivery delays.**

*(Place your PCA Scatterplot here to visually show the distinct separation between these two groups)*

---

## Features that Matter

I used Principal Component Analysis (PCA) to visualize these high-dimensional relationships in 2D space, confirming the separation. But looking at the feature importance gave the actionable insight:

-   **Order Frequency & Total Spend** were strongly positively correlated with **On-Time Deliveries**.
-   **Delivery Delay** was the primary wedge driving customers into the lower-value segment.

It suggests a feedback loop: A customer experiences a delay -> they order less/spend less -> they become "low value" (or churn entirely).

---

## Conclusion: Operational Excellence is Marketing

This project went beyond a simple coding exercise. It demonstrated that in quick commerce, **operations is marketing**. You cannot segment high-value customers solely by marketing to them; you have to *deliver* to them—literally. 

The "Delay-Affected" cluster represents a massive opportunity. If the business can fix its operational bottlenecks for these specific users, there is a clear path to migrating them into the "High-Value" tier.

**Check out the full analysis and code in the [main project notebook](https://plot-masters.github.io/customer-segmentation/).**
