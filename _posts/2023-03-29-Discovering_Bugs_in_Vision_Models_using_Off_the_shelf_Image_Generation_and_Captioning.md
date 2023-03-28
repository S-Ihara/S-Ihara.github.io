---
layout: papers
title:  "Discovering Bugs in Vision Models using Off-the-shelf Image Generation and Captioning"
subtitle: "reading papers"
date: 2023-3-27
categories: ["papers"]
feature_image: /assets/img/image_1679996614868_0.png
sitemap:
  priority: 0.8
publish: True
---
## どんなものか
- 大規模Vision and Languageモデルを使ってVisionモデルの不具合を発見する手法を提案した
	- ImageNetの画像分類器に対して不具合を発見する
- 分類器が失敗した入力をクラスタリングしてキャプションを付けることで人間に解釈できる失敗の表面化を行う
<!--more-->
- ![image.png](/assets/img/image_1679996614868_0.png)

## 先行研究と比べて
- 誤分類の発見の自動化の取り組みは最適化やブルートフォースサーチなどから入力空間を十分に制約するルールや仕様を抽出することができていた。
- しかしこのようなアプローチは人間の創造性に依存しておりスケールアップが困難である

## 技術や手法のポイント
- Generating failure cases, Classify and measure failure rate
	- ベースプロンプト（例えば"a realistic photograph of a fly (insect)"）により画像を生成し分類器を通し誤分類データを集める
	- この時ベースプロンプトによる誤分類発生率も計算しておく
- Clustering failure cases
	- 誤分類時のラベルや、事前学習済みモデルの中間層の類似度などでクラスタリングする
- Failure case captioning
	- キャプションモデルで誤分類モデルのキャプションを得る
	- クラスタなら複数得て全部まとめたものを理想的な敵対的生成キャプションとしておく
- Classify and measure failure rate
	- ベースプロンプトに敵対的生成キャプションを加えたプロンプトから画像を生成
	- 生成した画像での誤分類率をベースプロンプトによる誤分類率と比べて大きければそのキャプションはより敵対的な生成を可能にしているといえる
- Caption refinement
	- ベースプロンプトと個々の生成したキャプションの組み合わせで誤分類率を計算することでキャプションの枝刈りを行う
- 以上のパイプラインにより、誤分類を発生させやすいキャプションを得る

## 検証方法
- 分類器としてResNet50、画像生成モデルとしてImagen、キャプションモデルとしてFlamingoを用いてキャプションを生成させた
	- ![image.png](/assets/img/image_1679898916570_0.png)
	- aでは真のラベル"Persian cat"に対して、"a realistic photograph of a Persian cat (domestic animal)."で生成した画像は0.1%の確率で誤分類され（表に0.1の情報はないが論文中に記載あり）その内訳はグラフの左のようになった
	- ここで上のようなキャプションにすることで"Snow leopard"の誤分類確率が急激に上がることが右のグラフから分かる
- 失敗記述の一般化可能性
	- モデルを変えて行っても同様に上手くいった
	- 画像生成モデルをImagenからDalle-2に変えても結果が大きく変わらなかった
	
## 議論
- キャプションモデル、画像生成モデルなどのいくつかのVision and Languageモデルを横断させていて個々のモデルの信頼度が高くないとできなさそう
- 画像認識についての情報をテキストで提供するためのVision and Languageの新しい使い方で面白いなと思った
