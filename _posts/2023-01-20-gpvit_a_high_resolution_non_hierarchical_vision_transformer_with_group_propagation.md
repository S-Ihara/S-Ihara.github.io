---
layout: page
title:  "gpvit: a high resolution non-hierarchical vision transformer with group propagation"
subtitle: "reading papers"
date: 2023-1-16
categories: ["papers"]
feature_image: /assets/img/image_1673835153368_0.png
sitemap:
  priority: 0.7
---

- ## どんなものか  
- 画像認識のための非ピラミッド型のTransformer用モデルを提案した  
- Group Propagationと呼ばれる学習可能な一定数のグループトークンにより特徴量をグループ化しグループ化された特徴量間で大域的な情報を交換するグループ伝搬を行う  
- 本手法は画像認識の様々なタスク（画像分類, セマンティックセグメンテーション, 物体検出, インスタンスセグメンテーション）において性能向上し, 特に高解像度出力を必要とするタスクにおいて大きな性能向上を達成した  
<!--more-->
- ![image.png](/assets/img/image_1673835153368_0.png)  
-  
- ## 先行研究と比べて  
- Vision Transformerの精度を上げるための方法として特徴量の解像度を上げる（トークン数を増やす）などがある  
	- しかし計算量が二乗で増えていく  
- 1つの解決策として畳み込み特性を入れ込んだSwinなどがある  
	- 計算量などは確かに削減できているが, Transformerの思想（グローバルなAttentionを取れる）と相反している  
- 本手法は解像度を上げしかし非ピラミッド型のAttentionの取り込みを可能とした手法である  
-  
- ## 技術や手法のポイント  
- Group Propagation Block  
- 学習可能なグループトークンを用意（個数はハイパラ）しグループトークンと画像トークンでクロスアテンションを取り情報集約後, 再度高解像度の画像トークンをそのグループトークンとクロスアテンションを取ることで元の次元数に戻す  
- ![image.png](/assets/img/image_1673837259482_0.png)  
-  
- ## 検証方法  
- ImageNet 1k  
- ![image.png](/assets/img/image_1673839667496_0.png)  
- MS COCO(物体検出)  
- ![image.png](/assets/img/image_1673839701296_0.png)  
- ![image.png](/assets/img/image_1673839786653_0.png)  
- Semantic Segmentation  
- ![image.png](/assets/img/image_1673839864035_0.png)  
- ![image.png](/assets/img/image_1673839894613_0.png){:height 581, :width 671}  
-  
- Group Tokenの個数の検証  
	- 各ハイパラでImageNetの精度で検証  
	- ![image.png](/assets/img/image_1673840165258_0.png)  
	- グループ数は精度と速度でトレードオフとなる結果となった  
- ## 議論  
- 物体中心表現を自然に実現できている  
- ![image.png](/assets/img/image_1673840239146_0.png)  