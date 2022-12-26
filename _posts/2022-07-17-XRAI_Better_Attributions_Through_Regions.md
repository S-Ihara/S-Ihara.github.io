---
layout: page
title:  "XRAI: Better Attributions Through Regions"
subtitle: "reading papers"
date:   2022-06-26
categories: ["papers"]
sitemap:
  priority: 0.7
---

## どんなものか

![論文figure2. XRAIでは帰属領域を段階的に成長させる。選択可能なセグメントのプールから予測に重要な3%の領域と10%の領域の例。](/assets/img/blog/XRAI_Better_Attributions_Through_Regions-fig1.png)

論文figure2. XRAIでは帰属領域を段階的に成長させる。選択可能なセグメントのプールから予測に重要な3%の領域と10%の領域の例。

新しい領域ベースの帰属法であるXRAIを提案した。また画像ベースのSaliency mapsの品質を経験的に評価する方法(PIC)や帰属法に対する公理ベースのサニティチェックを提案した。

## 先行研究と比べて

既存の画素単位での勾配によるsaliency mapsを得る手法に代わりIntegrated gradientに基づいた領域ベースの手法を開発した。またいくつかの検証手法を取り入れた。

## 技術や手法のポイント

![スクリーンショット 2022-06-26 13.06.02.png](/assets/img/blog/XRAI_Better_Attributions_Through_Regions-fig2.png)

入力画像にさまざまな形状の領域にオーバーセグメントし、空の状態からそれぞれのセグメントを追加しスコアを計算する。スコアが1番高いものから順に高いランクのセグメントとすることで各領域の重要度を計算する。

## 検証方法

AIC：画像を重要と示されている部分から徐々に追加していき、元の画像のスコアに対する現在のスコアの割合をy軸にとったグラフである。

SIC：画像を重要と示されている部分から徐々に追加する。この時必要でない部分をボケ画像で補う。y軸は現在の元の画像のスコアに対する現在のスコアである。

各評価においてカーブがより早く大きくなるものがいい手法である。

![スクリーンショット 2022-06-26 14.32.10.png](/assets/img/blog/XRAI_Better_Attributions_Through_Regions-fig3.png)

## 議論