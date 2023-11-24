---
layout: papers
title:  "Battle of the Backbones: A Large-Scale Comparison of Pretrained Models across Computer Vision Tasks"
subtitle: "reading papers"
date: 2023-11-22
categories: ["papers"]
feature_image: /assets/img/image_1700636586475_0.png
sitemap:
  priority: 0.7
publish: True
---  
- ## どんなものか
- コンピュータビジョン分野において、データもモデルもどんどん大規模化するなかBackborn（事前学習済みモデル）として何が優秀かを検証した
- より大規模データセットによる教師あり学習が優秀な他、データセットの規模が同じ場合SSLも非常に高い性能を出せることが分かった
<!--more-->
- ## 先行研究と比べて
- backbornネットワークとしての性能比較としてImageNetで訓練されたモデルと下流分類タスクへの移植性をベンチマークした論文や、VAEやGAN識別器など自己教師あり学習法をテストした論文などがある
	- いずれもImageNetの教師あり学習モデルで高い精度が報告されている
- 近年では更なるデータセットの大規模化やSSL手法の発展があり、この研究ではそれらを包括したうえで検証を行う
- ## 技術や手法のポイント
- 多様なバックボーンの特徴として、アーキテクチャ、事前学習ルーチン、事前学習データセットが挙げられる
	- ![image.png](/assets/img/image_1700635859987_0.png)
- バックボーンの性能比較のための下流タスクとして以下を考える
	- クラス分類
		- 自然画像、医療画像、衛星画像など様々なドメインにより検証
	- 物体検出、セグメンテーション
	- 分布外汎化
		- ImageNet-Rなどを使って検証
	- 画像検索
- ## 検証方法
- 実用を考えたとき、大きすぎるモデルは使いにくいのでモデルサイズはConvNeXt-Base以下に限定する
- ![image.png](/assets/img/image_1700636586475_0.png){:height 289, :width 479}
	- タスク間の性能には相関がある
- どのモデルが性能が良かったか
	- ![image.png](/assets/img/image_1700637207456_0.png){:height 226, :width 677}
	- ![image.png](/assets/img/image_1700637225097_0.png){:height 288, :width 491}
		- 超軽量モデルでの比較（< 30M parameters）
-
- ViT vs CNN
	- CNNベースが僅差ではあるが上回る結果となった
		- さらにモデルを大規模化していくと、ViTも可能性がある
	- ViTはスケールの恩恵がCNNよりも大きい
	- ViTはバックボーン含む全層のfine tuningが必要
	- CNNは線形probingの性能が高い
- 教師あり vs SSL
	- より大きな事前学習データがある場合、教師あり学習バックボーンの方が性能が高いが事前学習サイズが上回る
- タスク間の性能に相関がみられる
- 生成学習バックボーン（MAEやStable Diffusion）は他の教師ありやSSLに比べると少し劣っていた
- ## 議論
- さらに多様なタスク（e.g. rl）で評価した際にも同様のことが言えそうかは気になる
