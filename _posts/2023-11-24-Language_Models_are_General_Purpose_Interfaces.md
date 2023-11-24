---
layout: papers
title:  "Language Models are General-Purpose Interfaces"
subtitle: "reading papers"
date: 2023-7-19
categories: ["papers"]
feature_image: /assets/img/image_1689763047662_0.png
sitemap:
  priority: 0.7
publish: True
---  
- ## どんなものか
- Language Model (GPT)は言語タスクだけでなく視覚やマルチモーダルなタスクにも対応する汎用的なインターフェースとして機能することを示した
- マルチモダリティにも関わらずZero-shot性能やin-context learningなどを可能にし、言語ベンチマークや視覚言語ベンチマークの実験結果からタスク専門のモデルを凌駕しうる結果が得られた
<!--more-->
- ![image.png](/assets/img/image_1689763047662_0.png){:height 338, :width 560}
- ## 先行研究と比べて
- 大規模言語モデル（GPT）は言語タスクの基盤モデルである
	- しかし言語タスクに限らず視覚やマルチモーダルなタスクにも対応する汎用的なインターフェースとして機能する
	- 言語モデルは広い出力空間を持つので対応力も広い
- ## 技術や手法のポイント
- ![image.png](/assets/img/image_1689762913246_0.png)
- 事前訓練されたエンコーダーの集合(モデル自体はTransformer encoder)をTransformer decoderに全て入れて処理をすることができる
- vision-languageエンコーダーもgptの学習と同じような次単語予測で学習する
- ## 検証方法
- ~~言語タスクは割愛~~
- Image Captioning
	- ![image.png](/assets/img/image_1689763122166_0.png)
	- ![image.png](/assets/img/image_1689763182405_0.png)
- Visual Question Answering
	- ![image.png](/assets/img/image_1689763215977_0.png)
	- ![image.png](/assets/img/image_1689763229439_0.png)
	-
- ## 議論
- microsoft
- kosmosのモデルアーキテクチャのもと
