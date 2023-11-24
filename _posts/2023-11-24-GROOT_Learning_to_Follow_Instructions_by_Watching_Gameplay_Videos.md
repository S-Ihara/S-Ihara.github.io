---
layout: papers
title:  "GROOT: Learning to Follow Instructions by Watching Gameplay Videos"
subtitle: "reading papers"
date: 2023-11-17
categories: ["papers"]
feature_image: https://ar5iv.labs.arxiv.org/html/2310.08235/assets/figures/groot.png
sitemap:
  priority: 0.7
publish: False
---  
- ## どんなものか
- オープンワールド環境(minecraftなど)において、コストの高いテキストゲームプレイアノテーションを使わずにオープンエンドな指示に従うエージェントを学習させるフレームワークを提案する
	- Causal Transformerに基づくエンコーダデコーダアーキテクチャで実装
<!--more-->
- ![Refer to caption](https://ar5iv.labs.arxiv.org/html/2310.08235/assets/figures/groot.png)
- ## 先行研究と比べて
- minecraftでエージェントを作る研究は近年増えてきている
- インターネットスケールの動画を事前学習に用いたVPTではRLでfinetuningすることでダイヤモンド獲得に至ったが命令入力をサポートしていない
- VPTとMineCLIPを橋渡しすることでオープンエンドタスクを解決できるエージェントが作成されたが目標空間が十分でなく多段階タスクの解決が不十分
- ## 技術や手法のポイント
- ゲームプレイ動画から学習することを考える
	- すなわちunknown policyにより集められた状態遷移 $\{ s^{(i)}_{0:T} \}_i$ から学習を行う
	- 学習は過去の状態遷移が与えられた時に将来の状態の予測を行う形で学習する
		- ![image.png](/assets/img/image_1700213013921_0.png)
- モデル
	- ![Refer to caption](https://ar5iv.labs.arxiv.org/html/2310.08235/assets/x1.png){:height 194, :width 500}
	-
- ## 検証方法
- ![Refer to caption](https://ar5iv.labs.arxiv.org/html/2310.08235/assets/x2.png){:height 247, :width 600}
	- a: 他の手法との比較Elo Rating比較
	- b: 他の手法との勝率比較
	- c: タスクごとの成功率
- ![Refer to caption](https://ar5iv.labs.arxiv.org/html/2310.08235/assets/x21.png){:height 202, :width 568}
	- ダイヤモンド獲得タスクの遷移
- ## 議論
- 実装してからという感じ
	- VPTとMineCLIPを橋渡しすることでオープンエンドタスクを解決できるエージェントが作成されたが目標空間が十分でなく多段階タスクの解決が不十分
	- てかこれはどうやって解決してたんや？