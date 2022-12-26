---
layout: page
title:  "Where Should I Spend My FLOPS? Efficiency Evaluations of Visual Pre-training Methods"
subtitle: "reading papers"
date:   2022-12-22
categories: ["papers"]
sitemap:
  priority: 0.5
---

    
- ## どんなものか  
- 一定のFLOPs予算（計算資源）がある場合, 画像認識において高い精度を得るための事故教師あり学習は何かを調査した論文  
- ## 先行研究と比べて  
- SSL手法の事前学習データセットを比較した研究はわずかしかない  
- SSLの論文ではモデルのスケーリング曲線がよく使われるが, バックボーンのモデルのサイズは計算効率と同等ではなく（ステップ数など他の側面が全体のFLOPsを支配する可能性があるから）FLOPsについて有効性を比較した先行研究はなかった  
- ## 技術や手法のポイント  
- 4つのSSL手法（BYOL, SimCLR, DINO, MAE）と2つの教師あり手法（CLIP, 一般的なソフトマックスによる分類）を実行し比較する  
	- バックボーンとしてViT-B/16, ViT-L/16を用いる  
	- CLIPでは言語エンコーダに渡される"This is a photo of <label1> and <label2>..."という形式の疑似キャプションを用いる  
- データセットにはCOCO（118k images）, ImageNet-1k（1.2m images, 1k class）,ImageNet-21k（15m images, 21k class）, JFT-300M（302m images）, ALIGN（1.6b images）を用いた  
- ## 検証方法  
- ADK20kによるセマンティックセグメンテーションタスクで評価を行う  
	- オブジェクト検出のような他の複雑な視覚タスクを適度に代表するがImageNetのクラス分類のような単純な目的と比較して表現からより多くの空間的理解を必要とするため  
	- ![image.png](/assets/img/image_1671687259574_0.png){:height 203, :width 593}  
	- 図はそれぞれのデータセットによって事前学習させた後のfinetuning後の精度による比較  
	- 縦軸は精度, 横軸は消費時間や推定CO2などによる計算効率性を表し右に行くほど時間や資源を使っている  
	- CLIPの事前学習は強力な計算スケーリングを見せている  
	- SSLの中ではMAEが高性能である  
- データセットのキュレーション  
	- ステップ数は固定として事前学習用のデータセットによるfinetuning後の精度の比較  
	- ![image.png](/assets/img/image_1671688389635_0.png)  
	-  
- ## 議論
- みんな大好きDeepMind製
- CLIPってすごいんやなって