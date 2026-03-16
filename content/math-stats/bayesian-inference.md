---
title: 貝葉斯推斷的直覺與計算
date: 2026-03-12
category: math-stats
tags: [Bayesian, Probability, Statistics, MCMC]
summary: 從 Bayes 定理出發，理解先驗、似然、後驗的關係，以及為什麼 MCMC 是必要的。
---

## 貝葉斯定理的本質

$$P(\theta \mid X) = \frac{P(X \mid \theta) \cdot P(\theta)}{P(X)}$$

- $P(\theta)$：**先驗（Prior）** — 在看到數據之前的信念
- $P(X \mid \theta)$：**似然（Likelihood）** — 給定參數，數據出現的概率
- $P(\theta \mid X)$：**後驗（Posterior）** — 看到數據後更新的信念
- $P(X)$：**邊際似然（Evidence）** — 歸一化常數

貝葉斯的核心哲學：**概率是信念的度量，不是頻率的極限**。

## 共軛先驗（Conjugate Prior）

當先驗和後驗屬於同一族分布，稱為共軛。這讓後驗有解析解，無需 MCMC。

| 似然 | 共軛先驗 | 後驗 |
|------|----------|------|
| 二項分布 $\text{Bin}(n, \theta)$ | Beta$(a, b)$ | Beta$(a + k, b + n - k)$ |
| 泊松分布 $\text{Poi}(\lambda)$ | Gamma$(\alpha, \beta)$ | Gamma$(\alpha + \sum x_i, \beta + n)$ |
| 正態分布（已知 $\sigma^2$） | $\mathcal{N}(\mu_0, \sigma_0^2)$ | 解析可得 |

### 例：Beta-Binomial

投硬幣 10 次，正面 7 次。先驗 $\theta \sim \text{Beta}(2, 2)$（稍微傾向均勻）。

後驗：$\theta \mid X \sim \text{Beta}(2+7, 2+3) = \text{Beta}(9, 5)$

後驗期望值 $= \frac{9}{14} \approx 0.643$，比頻率估計 $0.7$ 更保守（先驗的正則化效果）。

## 為什麼需要 MCMC？

大多數實際問題的後驗沒有解析形式。問題出在 $P(X)$：

$$P(X) = \int P(X \mid \theta) P(\theta) \, d\theta$$

高維積分在計算上是 NP-hard。
**MCMC（馬可夫鏈蒙地卡羅）** 的思路：不計算 $P(X)$，直接從後驗**抽樣**。

### Metropolis-Hastings 核心邏輯

```python
def metropolis_hastings(log_posterior, theta_init, n_samples):
    theta = theta_init
    samples = []
    for _ in range(n_samples):
        theta_proposal = theta + np.random.normal(0, 0.1, size=theta.shape)
        log_ratio = log_posterior(theta_proposal) - log_posterior(theta)
        if np.log(np.random.uniform()) < log_ratio:
            theta = theta_proposal  # 接受
        samples.append(theta)
    return np.array(samples)
```

接受率 $\alpha = \min\left(1, \frac{P(\theta' \mid X)}{P(\theta \mid X)}\right)$ 中，$P(X)$ 被消掉了——這是 MCMC 的精妙之處。

## 貝葉斯 vs 頻率學派

| 面向 | 頻率學派 | 貝葉斯學派 |
|------|----------|------------|
| 參數 $\theta$ | 固定未知常數 | 隨機變量 |
| 推斷工具 | 點估計、信賴區間 | 後驗分布 |
| 小樣本 | 不穩定 | 先驗可補充信息 |
| 計算 | 通常簡單 | 可能需要 MCMC |

對 ML 實踐者來說，貝葉斯思維最有價值的地方是**不確定性量化**——知道模型「不知道什麼」比知道它「知道什麼」更重要。
