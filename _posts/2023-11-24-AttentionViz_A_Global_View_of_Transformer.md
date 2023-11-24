---
layout: papers
title:  "AttentionViz: A Global View of Transformer Attention"
subtitle: "reading papers"
date: 2023-5-22
categories: ["papers"]
feature_image: /assets/img/image_1684722042918_0.png
sitemap:
  priority: 0.7
publish: True
---
- ## どんなものか
- トランスフォーマーモデルに対して、QueryとKeyを同じ空間にて可視化させることでグローバルな分析が可能な可視化を提案した
	- ここでのグローバルはある単一の入力ではなく複数の入力に対してまとめて可視化ができるという意味
<!--more-->
- ![image.png](/assets/img/image_1684722042918_0.png){:height 345, :width 778}
- ## 先行研究と比べて
- 単一の入力に対して分析や可視化を行う研究はたくさんあったが複数の入力に対してまとめて分析や可視化を行う研究はTransformerに対しては少なかった
- ## 技術や手法のポイント
- ある入力のクエリとキーに対して次元削減を行うことで可視化をする
	- ![image.png](/assets/img/image_1684722498208_0.png){:height 271, :width 449}
- ただ次元削減するだけだとクエリとキーが分離してしまうのでクエリとキーが重なり合うようにクエリとキーに対してNormalizationをしてから次元削減を行うことで解決する
	- ![image.png](/assets/img/image_1684722659518_0.png)
	- ここでのNormalizationはsoftmaxは定数を足しても結果が変わらないことを利用して同じ空間になるように調節する
- ## 検証方法
- global searchによる注意の探索
	- ![image.png](/assets/img/image_1684723095043_0.png){:height 431, :width 506}
	- 検索結果のクラスターが少ないヘッドはより意味的な動作を示すことが多く検索結果が分散しているヘッドはトークンの位置に注目することが多くなる
	- 例えばLayer2 Head6 では意味的なクラスターを確認できる
- single view
	- ![image.png](/assets/img/image_1684723627522_0.png){:height 383, :width 451}
	- ViTでの単一入力に対する可視化
- ## 議論
- 図7などでアテンションフローが表示されているが画像全体で全部同じ方向に流れてるの画像に対するアッテンションとしてかなり気持ち悪い
	- 他の画像でもほぼ全部横方向のみとかになってたりしていてかなり怪しさを感じる
	- transoformerが層ごとヘッドごとでそういう挙動をしている可能性もなくはないがそんなバイアスがかかる仕組みはないはずなのでやっぱり気持ち悪さを感じる
	- "Attention"を"矢印"を使って表現しているのが筋が悪そう（Attentionは基本的には双方向のはずなので）
- Attentionに対して内積を取る前にクエリとキーに目を付けたのは面白かった
- グローバルな可視化比較的少ないし面白そうでいいね
