---
layout: papers
title:  "attention-aware learning for hyperparameter prediction in image processing pipelines"
subtitle: "reading papers"
date: 2023-2-20
categories: ["papers"]
feature_image: /assets/img/image_1676874768603_0.png
sitemap:
  priority: 0.5
---
  
## どんなものか
- ハードウェア画像信号処理（ISP; image signal processing）パイプラインではセンサー信号からRGB画像を再構成し下流タスクに供給する
- ISPの処理ブロックは出力と複雑な相互作用を持つハイパーパラメータの集合に依存している
	- ハイパーパラメータのチューニングは手がかかる
- そこでハイパーパラメータ予測ネットワークをパイプラインに組み込んだ
<!--more-->
- ![image.png](/assets/img/image_1676874768603_0.png)

## 先行研究と比べて
- ISP処理のパイプラインにはいくつかの画像処理コンポーネントが存在し、それらタスクではハイパーパラメータチューニングが必要となる
- 様々な先行研究の取り組みがあるがどれも、入力RAW画像に対する多様性や識別性に欠ける

## 技術や手法のポイント
- ![image.png](/assets/img/image_1676877459294_0.png)
- (A) Attention-aware prediction network
	- 3x3畳み込みとmax poolingを数層並べたネットワークで、様々な解像度の特徴量を抽出する
	- それぞれの解像度でattentionを取り得られた特徴量と掛け合わせている
		- ハイパーパラメータはRAW画像に含まれる意味情報がパラメータの取得を大きく左右するため
- (B) ハードウェアISPを模倣したISP微分可能CNNプロキシの学習
	- RAW画像とISP処理のハイパーパラメータを入力として、ISP処理を真似するような（近似するような）ネットワーク $O_{proxy}$ を学習させる
- (C) CNNベースISPと下流タスクモデルの学習パラメータを固定し、高レベル損失関数が与えられたときに入力パラメータ自体を最適化

## 検証方法
- ![image.png](/assets/img/image_1676948064943_0.png){:height 267, :width 472}
- COCOデータセットで物体検出（左）とセグメンテーション（右）を行った
- デフォルトハイパーパラメータ（上）とチューニング済みのハイパーパラメータ（中）、提案手法（下）での比較
	- 下流タスクにおいて提案手法は良い性能を達成している
- **ablation study**
- ![image.png](/assets/img/image_1676948629453_0.png)
- チューニング済みハイパーパラメータと提案手法による知覚的画質の比較（左）ISO範囲別のハイパーパラメータの予測値の散布図（中）human viewing datasetにおける符号化ブロック数に対するPSNR性能の比較
- 真ん中の図はノイズ低減モジュールと鮮鋭化モジュールの2つのパラメータによる散布図であり、提案手法は異なる照明条件下において自己適応的にハイパーパラメータを最適化できている
- ![image.png](/assets/img/image_1676949134771_0.png)
- multi Attentionは有意に働いた

 - ## 議論