---
layout: page
title:  "Don't Lie to Me! Robust and Efficient Explainability with Verified Perturbation Analysis"
subtitle: "reading papers"
date:   2022-12-05
categories: ["papers"]
---

- ## どんなものか  
- Perturbation basedなsaliency mapsを生成する新規手法, EVA(Explaining using Verified perturbation Analysis)を提案した  
- ![image.png](/assets/img/image_1669258785455_0.png){:height 252, :width 439}  
	- (図1). saliency, つまり勾配はxの周りの限りなく小さい摂動を用い, 摂動(Occlusion)は単にベースライン状態に向かって各変数を1つずつ変化させる. ランダムサンプリングは結果を偏らせる.  
	  我々の提案手法は検証済み摂動解析を用いて, xの周りの摂動空間を効率的かつ系統的に探索し, 信頼性が高く忠実な説明を生成することを提案する.  
- ## 先行研究と比べて  
- いくつかのperturbatin basedな説明性手法は摂動の空間をランダムにまばらに探索している. これらの方法は探索する空間の点の近傍におけるモデルの安定性について強い保証を提供しない.  
- ## 技術や手法のポイント  
- ![image.png](/assets/img/image_1670222878982_0.png)  
	- 提案手法(EVA attribution method)の手法概要図  
- モデルの決定を変えるために変数uがどれくらい大切であるかを測定する  
	- uを除いた摂動がadversarialな例を生成しにくいときuは重要である  
	- 各uについて計算し重要度マップを計算する  
-  
-  
- ## 検証方法  
- Deletion, Insertion, MuFidelity, Robustness-S_r のメトリクスを用いた実験結果が以下  
- ![image.png](/assets/img/image_1670225198534_0.png)  
- ## 議論  
-  
-  