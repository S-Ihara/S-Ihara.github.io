---
layout: papers
title:  "Sparse and Hierarchical Masked Modeling for Convolutional Representation Learning"
subtitle: "reading papers"
date: 2023-1-20
categories: ["papers"]
feature_image: /assets/img/image_1674197204213_0.png
sitemap:
  priority: 0.7
---
- ## どんなものか  
- CNNベースのモデルに対してmasked image modelingを用いた事前学習における2つの重要な障害を特定し克服した  
	- 畳み込み演算は不規則でランダムなマスクの入力画像を扱えない  
	- BERT 事前学習のシングルスケールの性質はconvnetの階層的な構造と矛盾している  
<!--more-->
- ## 先行研究と比べて  
- マスクされた部分の画素値を0としてCNNに送り込むこともできるが激しいデータ分布のずれなどが起こり MAE などと同様には上手くいかない  
- ![image.png](/assets/img/image_1674197204213_0.png)  
- また自然言語処理から着想を得たmaskではCNNの階層的な処理の利点が失われてしまう  
-  
- ## 技術や手法のポイント  
- 提案手法はSparse masKed modeling (SparK)と呼ばれ下図のような階層的マスクイメージモデリングによって畳み込みネットワークを事前学習させることを目的としている  
- ![image.png](/assets/img/image_1674197512044_0.png)  
- CNNでのmasked image modelingの欠点として下図の左にあるように密な畳み込みの計算によりフィルタが0でない点を少しでもカバーした瞬間にmaskされていた部分の結果が0でなくなってしまい、最終的にはマスク領域が消失する  
- 数層畳み込みを行うとマスクされた部分がなくなってしまうのは望ましくない  
	- そこで疎な畳み込みを利用することでこの問題を解決する  
	- ここでの疎な畳み込みとはマスクされた領域はすべて計算上スキップしマスクされていない点のみで計算を行う  
	- これにより畳み込みによりマスクパターンの形状が変化するのを防げる  
- デコードするためのモデルアーキテクチャとしては UNet を用いる  
- ![image.png](/assets/img/image_1674197751320_0.png)  
-  
- ## 検証方法  
- 下流タスクにおける精度で検証を行う  
- ImageNetを用いてTransformerバックボーンに対して様々な事前学習を用いてImageNetでファインチューニングした時の精度との比較  
- ![image.png](/assets/img/image_1674198643497_0.png)  
-  
- COCOデータセットによるセグメンテーションや物体検出タスクにおける比較  
- ![image.png](/assets/img/image_1674198733388_0.png)  
-  
- SparKと対比系の事前学習手法の精度比較  
- ![image.png](/assets/img/image_1674198835571_0.png)  
-  
- スケールアップの確認  
- ![image.png](/assets/img/image_1674198924956_0.png)  
-  
- 再構成結果の可視化  
- マスク率は60％  
- ![image.png](/assets/img/image_1674199090932_0.png)  
-  
- ## 議論  
- CNN使ってるから再構成で高周波成分に強かったりとかあるんかな  
