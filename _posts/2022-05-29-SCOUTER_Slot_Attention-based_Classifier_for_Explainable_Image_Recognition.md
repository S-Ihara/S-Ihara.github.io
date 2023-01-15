---
layout: page
title:  "SCOUTER: Slot Attention-based Classifier for Explainable Image Recognition"
subtitle: "reading papers"
date:   2022-05-29
categories: ["papers"]
feature_image: /assets/img/blog/SCOUTER Slot Attention-based Classifier for Explainable Image Recognition-fig1.png
sitemap:
  priority: 0.3
---

## どんなものか

透明かつ正確な分類を行えるSCOUTER(Slot-based COnfigUrable and Transparent classifiER)と呼ばれるスロット注意機構に基づく分類器を提案した。

またSCOUTERに合わせた新しい損失を設計し、正負の説明や説明領域の大きさも制御できるようにした。
<!--more-->
![論文Figure 1: 肯定的な説明と否定的な説明の例](/assets/img/blog/SCOUTER Slot Attention-based Classifier for Explainable Image Recognition-fig1.png)

論文Figure 1: 肯定的な説明と否定的な説明の例

## 先行研究と比べて

本手法の説明性は注意機構ベースの説明性を用いている。

他の注意機構ベースの説明性手法との大きな違いは

- 各カテゴリの最終的な信頼度に関与して、より直感的な解釈を提供できる
- 任意の画像、クラスに対して正負の説明ができる

## 技術や手法のポイント

![論文Figure 2: 分類パイプライン。(a)分類モデルの概観。(b)SCOUTERのxSlot Attentionモジュール。](/assets/img/blog/SCOUTER Slot Attention-based Classifier for Explainable Image Recognition-fig2.png)

論文Figure 2: 分類パイプライン。(a)分類モデルの概観。(b)SCOUTERのxSlot Attentionモジュール。

分類モデルは通常特徴抽出器と分類器からなっている。ここで分類器の部分をSCOUTER(xSlotモジュール)に置き換え、SCOUTER損失で学習する。

- xSlotモジュール
    
    SCOUTER用に調整されたスロット注意機構であり、xSlotモジュールの各スロットはカテゴリと関連づけられている。スロット注意機構ではカテゴリlのために直接関連する画像内のサポートS_iを見つける。
    
- SCOUTER損失
    
    基本的にはクロスエントロピー損失であり、正則化項としてサポート領域の面積を制御する項が追加される。
    

## 検証方法

視覚的説明の品質の評価指標としてImageNet内のバウンディングボックスを物体領域の代理として用い、説明全体の総画素数に対するバウンディングボックス内に位置する画素数の割合として用いる。

またそのほかの指標としていくつかの論文で使われている指標を用いた。

その結果が以下のtable 1である

![論文 Table 1 : いくつかの指標についての結果をまとめた表](/assets/img/blog/SCOUTER Slot Attention-based Classifier for Explainable Image Recognition-fig3.png)

論文 Table 1 : いくつかの指標についての結果をまとめた表

## 議論

SCOUTERの欠点の一つとしてクラス数が増えると学習が不安定になることがあげられる。よって適用対象は中小規模のデータセットに限定される。
