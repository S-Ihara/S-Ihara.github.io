---
layout: papers
title:  "The Reversal Curse: LLMs trained on \"A is B\" fail to learn \"B is A\""
subtitle: "reading papers"
date: 2023-11-24
categories: ["papers"]
feature_image: https://ar5iv.labs.arxiv.org/html/2309.12288/assets/figures/Experiment_2_explainer.png
sitemap:
  priority: 0.7
publish: True
---  
- ## どんなものか
- 自己回帰型大規模言語モデルにおける汎化の性能に関して「逆転の呪い; The Reversal Curse」と呼ぶ性質を検証
	- 「逆転の呪い」とは「AはBである」という形の分に対して学習された場合、自動的に逆方向の「BはAである」に汎化されることがないというものである
<!--more-->
- ![Refer to caption](https://ar5iv.labs.arxiv.org/html/2309.12288/assets/figures/Experiment_2_explainer.png){:height 152, :width 677}
- ## 先行研究と比べて
- 逆転の呪いに関する他の研究として、LLMの出力に与えられた訓練例を加えることがどの程度影響するかを決定するために影響関数を用いた研究がある
	- この研究でも逆転の呪いを支持する結果が報告されている
- ## 技術や手法のポイント
- finetuning test
	- ![Refer to caption](https://ar5iv.labs.arxiv.org/html/2309.12288/assets/x1.png){:height 426, :width 534}
	- "<name> is <description>"という形式の架空の事実についてベースとなるLLMをfine tuningする
	- モデルの対して両方の順序で質問をすることで検証を行う
- ![Refer to caption](https://ar5iv.labs.arxiv.org/html/2309.12288/assets/x2.png){:height 232, :width 397}
- ## 検証方法
- "<name> is <description>"（あるいはその逆）という形式の文書からなるデータセットを作成する
- GPT-3をfinetuningすることで実験
- モデルを完全一致するかどうか、と尤度が増加するかどうかについて定量的に評価を行う
	- 完全一致率
		- ![image.png](/assets/img/image_1700808437245_0.png){:height 127, :width 466}
		- プロンプトがデータセットの順序と一致する場合はモデルは良く一般化するが順序が逆になると完全に失敗する
	- 尤度増加
		- ![Refer to caption](https://ar5iv.labs.arxiv.org/html/2309.12288/assets/x3.png){:height 258, :width 417}
		- 正しい名前に割り当てられた対数尤度とランダムな名前に割り当てられた対数確率の間に検出可能な差はない
- ## 議論
- GPTのアーキテクチャ（いわゆる**Causal** Transformer, Decoder only）から割と直感的には納得できる結果と言える