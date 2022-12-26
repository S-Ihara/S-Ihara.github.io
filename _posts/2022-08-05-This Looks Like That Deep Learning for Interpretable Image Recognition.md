---
layout: page
title:  "This Looks Like That: Deep Learning for Interpretable Image Recognition"
subtitle: "reading papers"
date:   2022-07-28
categories: ["papers"]
sitemap:
  priority: 0.7
---

## どんなものか

![スクリーンショット 2022-07-28 11.05.33.png](/assets/img/blog/This Looks Like That Deep Learning for Interpretable Image Recognition-fig1.png)

画像のクラス分類に対してあるクラスの典型的な例（prototype）を示すことで予測に対する説明を行う手法。

## 先行研究と比べて

ポストホックにモデルやCNNがの説明可能性分析を行うものと比べて、本手法ではモデルが実際にどのように意思決定を行うかの推論プロセスを内蔵している。

さらにSaliency maps手法と比べるとどの部分に注目しているかだけでなく、本手法では典型例を指し示すことができる。

## 技術や手法のポイント

![スクリーンショット 2022-07-28 12.06.16.png](/assets/img/blog/This Looks Like That Deep Learning for Interpretable Image Recognition-fig2.png)

モデル全体のアーキテクチャは上図のようになる。特徴量抽出器で得られた特徴量fを基にモデルが保持しているプロトタイプとL2距離により類似度を計算。これにより類似度スコア活性化マップが得られそれをGAPすることで値とし、その値を用いて識別を行う。

## 検証方法

![スクリーンショット 2022-07-28 12.34.36.png](/assets/img/blog/This Looks Like That Deep Learning for Interpretable Image Recognition-fig3.png)

モデルの精度はBase lineのそれとほぼ同等である（表１上）。

![スクリーンショット 2022-07-28 12.42.30.png](/assets/img/blog/This Looks Like That Deep Learning for Interpretable Image Recognition-fig4.png)

従来の説明法より典型例の提示によりわかりやすくなっている。（定性的な評価）

## 議論