---
layout: papers
title:  "Ignore Previous Prompt: Attack Techniques For Language Models"
subtitle: "reading papers"
date: 2023-3-24
categories: ["papers"]
feature_image: /assets/img/image_1679654446662_0.png
sitemap:
  priority: 0.7
publish: True
---
## どんなものか
- Transformerベースの大規模言語モデルに足しいて敵対的プロンプト合成のためのフレームワークであるPROMPTINJECTを提案した
- goal hijackingとprompt leakingと呼ばれる2つの攻撃を提案した
	- goal hijackingはプロンプトの本来のゴールとターゲットフレーズを印刷するという新たなゴールとの間にずれを生じさせる行為
	- prompt leakingはプロンプト本来の目的を、本来のプロンプトの一部または全体を代わりに印刷するという新たな目的にすり替える行為
<!--more-->
- ![image.png](/assets/img/image_1679654446662_0.png)

## 先行研究と比べて
- テキスト分類器に対する敵対的な攻撃の研究はいくつか存在するが、本論文では元のタスクに関係なくモデルをミスリードさせることを目的としている

## 技術や手法のポイント
- ![image.png](/assets/img/image_1679654912939_0.png)
- ベースプロンプトはGPTを使ったアプリケーション一般的な条件を再現した初期命令で構成されている
- 攻撃プロンプトは不正な文字列（敵対的命令）からなっている
	- 言語モデルはエスケープ文字や区切り文字に対して敏感であることが確認されているためモデルを混乱させるために様々な悪意のある文字で攻撃を強化することができる

## 検証方法
- OpenAI Examplesページから収集した35のベースプロンプトに対して攻撃を実行することで有効性を検証
- モデルはtext-davinci-002を使用
- goal hijacking
	- ![image.png](/assets/img/image_1679655431464_0.png)
- prompt leaking
	- ![image.png](/assets/img/image_1679655484779_0.png)
- いくつかのモデルで検証すると性能の高いモデルの方が脆弱なモデルであった
	- 逆スケーリング現象の存在が示唆される
	- 強いモデルはよりプロンプトに忠実に従ってしまうので明示的な悪意のあるプロンプトに対しても働いてしまうことが考えられる
	
## 議論
- human feedbackによるfine tuning前のモデルでのプロンプトインジェクション
- 付録に実際の攻撃例や具体的な悪意のあるプロンプトの例が載っている
	-
