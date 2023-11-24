---
layout: papers
title:  "Vision Transformers Need Registers"
subtitle: "reading papers"
date: 2023-11-15
categories: ["papers"]
feature_image: /assets/img/image_1698107931363_0.png
sitemap:
  priority: 0.7
publish: True
---  
- ## どんなものか
- 教師ありViTと自己教師ありViTを用いて特徴マップにおけるアーチファクトを同定する
	- 推論中の画像の背景領域に高いAttentionが現れることがある
- Transformerの入力シーケンスに追加トークンを入れることで解決する
	- 下流の視覚処理のためのより滑らかな特徴マップとアテンションマップに繋がることを示す
<!--more-->
- ![image.png](/assets/img/image_1698107931363_0.png){:height 361, :width 675}
- ## 先行研究と比べて
- 自己教師あり学習手法の1つであるDINOに対してAttentionを解析したところ背景トークンのいくつかにAttentionが集まっていることがわかった
	- このトークンから線形層を用いると他のトークンよりも画像分類など大域的な特徴を捉えられていることがわかった
- ![image.png](/assets/img/image_1698108595304_0.png){:height 416, :width 592}
- ## 技術や手法のポイント
- DINOの解析
	- 背景に一部集まる高ノルムの"アーティファクトトークン"は他のトークンと比べてノルムが極端に高い
	- またアーティファクトトークンは画像の背景部分などパッチ情報が冗長なところに現れる
		- 具体的には隣接パッチと非常によく似たパッチ上に現れる
	- ![image.png](/assets/img/image_1698108815762_0.png){:height 303, :width 644}
	- このアーティファクトトークンを元に学習可能な全結合層を用いて位置予測（画像のどこのパッチにあったかを予測）と、ピクセル再構成を行った
		- アーティファクトトークンは、他のトークンに比べて精度が低く局所情報を持たないことがわかった
- 提案手法
	- モデルがregisterとして使用することができる余分なトークンを明示的に追加する
	- ![image.png](/assets/img/image_1698109290726_0.png)
- ## 検証方法
- モデルとしてDEIT-Ⅲ、OpenCLIP、DINOv2を用いてregisterの追加の効果を調べた
	- 図（上のどんなものかに使われている図）に示すようにアーティファクトを取り除くことができる
- resiter tokenの数
	- 他の実験では4を使用した
	- ![image.png](/assets/img/image_1698109606311_0.png)
- 教師なし物体検出
	- ![image.png](/assets/img/image_1698109769608_0.png){:height 319, :width 640}
	- 教師なし物体検出の精度が高い
- ## 議論
- 非常にシンプルな手法なので応用先が広そう