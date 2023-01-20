---
layout: page
title:  "Mastering Diverse Domains through World Models"
subtitle: "reading papers"
date: 2023-1-17
categories: ["papers"]
feature_image: /assets/img/image_1673926131304_0.png
sitemap:
  priority: 0.6
---
    
- ## どんなものか  
- World Modelを用いた汎用的でスケーラビリティの高いアルゴリズムであるDreamerV3を提案した  
- 固定ハイパラで様々なタスクにおいて高い精度を出し、なおかつ難易度の高いタスクにおいても成功を見せる  
- ## 先行研究と比べて  
- DreamerV2に対して細かいマイナーアップデートがいくつか盛り込まれている  
	- symlog prediction, ハイパラ固定化, 活性化関数としてSiLUを使う など  
- ## 技術や手法のポイント  
- ![image.png](/assets/img/image_1673926131304_0.png){:height 304, :width 776}  
- World Model Learning  
	- World Modelはautoencoderにより世界の表現学習を行う  
	- 状態と行動が与えられた時の次の状態を予測するEncoder Decoderモデルと潜在状態と行動が与えられたとき報酬とエピソード継続フラグを予測するモデルを学習させる  
- Actor Critic Learning  
	- 学習されたWorld Modelを使って強化学習を行う  
- ## 検証方法  
- 他の強化学習アルゴリズムとの比較  
- ![image.png](/assets/img/image_1673927996346_0.png)  
- 幅広いタスクで固定ハイパラで高い精度を達成している  

- スケーリング特性  
- ![image.png](/assets/img/image_1673927774181_0.png)  
- 横軸は環境ステップ数、縦軸は収益である  
- ## 議論  
- まだタスク間での知識やモデルの共有はしていないが、今後に期待したい  