---
title: Transformer 注意力機制的數學本質
date: 2026-03-14
category: ai-tech
tags: [LLM, Transformer, Attention]
summary: 從線性代數角度拆解 Multi-Head Self-Attention，理解為何 Softmax 是關鍵。
---

## 為什麼需要 Attention？

傳統 RNN 的問題在於**長程依賴消失**——序列越長，早期 token 的梯度越微弱。
Attention 的核心思路：讓每個位置直接「看到」所有位置，距離不再是障礙。

## Scaled Dot-Product Attention

給定查詢矩陣 $Q$、鍵矩陣 $K$、值矩陣 $V$：

$$\text{Attention}(Q, K, V) = \text{Softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$

**為什麼要除以 $\sqrt{d_k}$？**

當 $d_k$ 很大時，$QK^\top$ 的點積方差為 $d_k$（假設 $Q$, $K$ 各分量獨立且方差為 1）。
不縮放的話 Softmax 進入飽和區，梯度趨近於零：

$$\frac{\partial \text{Softmax}(z)_i}{\partial z_j} = \text{Softmax}(z)_i(\delta_{ij} - \text{Softmax}(z)_j)$$

飽和時 $\text{Softmax}(z)_i \approx 1$，偏導幾乎為 0。

## Multi-Head Attention

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O$$

其中 $\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$

不同 head 可以專注在不同語義關係：句法依賴、共指消解、位置鄰近性。

## 計算複雜度

| 層類型 | 複雜度 | 最長路徑 |
|--------|--------|----------|
| Self-Attention | $O(n^2 \cdot d)$ | $O(1)$ |
| RNN | $O(n \cdot d^2)$ | $O(n)$ |
| CNN (kernel $k$) | $O(k \cdot n \cdot d^2)$ | $O(\log_k n)$ |

Self-Attention 的 $O(n^2)$ 是長文本的瓶頸，催生了 FlashAttention、Sparse Attention 等改良。

## 直覺總結

Attention = 軟索引（soft indexing）。
Query 是你想問的問題，Key 是候選答案的標籤，Value 是答案本身。
Softmax 確保權重加總為 1，是一種**可微分的 argmax**。
