---
layout: page
title: "What I Cannot Predict, I Do Not Understand: A Human-Centered Evaluation Framework for Explainability Methods"
subtitle: "reading papers"
date: 2022-12-22
categories: ["papers"]
sitemap:
  priority: 0.5
---
    
- ## どんなものか  
- 説明可能性手法の評価において人間のエンドユーザーを考慮した大規模なpsychophysicsの実験手法を提案し, それらを用いていくつかの説明可能性手法を比較した  
-  
- ## 先行研究と比べて  
- 説明可能性の評価として徐々にピクセルを削除していき予測精度がどれくらい低下するかで行う評価などがあった  
	- 人間を考慮していない  
- また他の人間を対象とした説明評価に対してより一般的な評価フレームワークを提案し説明手法間の公平な評価を行う  
- ## 技術や手法のポイント  
- 人間がモデルが解釈可能かを「モデルの予測をいくつか見た時, 人間がモデルの予測を予測できる」と定義する  
- ![image.png](/assets/img/image_1671699399436_0.png){:height 150, :width 623}  
- 説明手法なしでモデルの予測を予測させる場合と, 説明手法ありでモデルの予測を予測させる場合を考える  
- 説明が有用であれば後者の方が精度が高くなる  
- ## 検証方法  
- いくつかの説明手法とモデルによりアンケート実験を行った  
- ![image.png](/assets/img/image_1671699623261_0.png)  
- 使用したデータはHusky vs Wolf, Leaves, Imagenet  
	- Husky vs Wolfは背景を見て分類するようになるバイアスがかかってしまうようなデータセット  
	- Leavesは専門家なら見分けられるデータセット  
		- 実験ユーザーは非専門家  
- ## 議論  
- Imagenetでは上手くいってない  
	- まぁそれはそうという感じはあるよね  
- 論文中でも触れられているけど, saliency mapsの限界を感じる  
	- どこを見ているかはざっくりわかるが, なぜ見てるかその中の何を見ているかは分からない  