---
layout: papers
title:  "Grounding Visual Illusions in Language: Do Vision-Language Models Perceive Illusions Like Humans?"
subtitle: "reading papers"
date: 2023-11-18
categories: ["papers"]
feature_image: /assets/img/image_1700198398105_0.png
sitemap:
  priority: 0.7
publish: True
---  
- ## どんなものか
- VLM（VIsion and Language Model）は人間が捉えた膨大なデータを基に学習され人間の世界認識をエミュレートする
	- 人間の現実認識は必ずしも物理世界に忠実ではない
- そこでVLMが人間同様の錯覚を持つのか、現実を忠実に表現して学習しているのか調査を行った
<!--more-->
- ![image.png](/assets/img/image_1700198398105_0.png)
- ## 先行研究と比べて
- 人間の視覚的錯覚現象が機械でも見られるかの研究はいくつかある
	- しかしこれら先行研究は視覚のみに基づくものである
- 本論文では言語コミュニケーションという新たな切り口から機械による錯視の研究を行う
- ## 技術や手法のポイント
- 調査を行うために視覚的錯視のベンチマークデータセット(GVIL; The Grounding Visual Illusion in Language Benchmark)を作成
	- 5種類の錯視を含む
	- ![image.png](/assets/img/image_1700198925175_0.png){:height 374, :width 221}
- 錯視の種類ごとに文献などからルート画像を収集
- そこから幾何学的な錯視では物体の色、色彩錯視では物体の位置など、錯視の効果に影響を与えず変更可能な属性を手作業で特定しそれらを編集して同じタイプの錯視事例を増やしデータセットの画像数を増やした
	- ![image.png](/assets/img/image_1700199118708_0.png){:height 270, :width 427}
	- データ増強の例
- ベンチマークタスク
	- 作成されたデータセットを基に視覚言語タスクを定義する
	- Same-Differenct Question Answering (SameDiffQA)
		- ![image.png](/assets/img/image_1700199505458_0.png){:height 314, :width 380}
		- 例
	- Referential Question Answering (RefQA)
	- Attribute Question Answering (AttrQA)
	- Referential Localization (RefLoc)
		- これらはVLMが画像を見ずにテキストの質問を見て答えることを防ぐためにある錯視の画像とそれらを反転させた画像を置いて質問することで検証を行うタスク
		- ![image.png](/assets/img/image_1700199770118_0.png){:height 372, :width 243}
- ## 検証方法
- VLMモデル
	- Unified-IO, OFA, LLaVA, InstructBLIPを使用
- SameDiffQA
	- ![image.png](/assets/img/image_1700199938312_0.png){:height 264, :width 561}
	- N/Aが多い
		- 根本的にVLMの性能が低い
		- ただしランダムな振る舞いよりかは認識ができているのでそもそもの実験設定自体はギリギリセーフ
- RefQA, AttrQA, RefLoc
	- ![image.png](/assets/img/image_1700200395876_0.png){:height 393, :width 361}
		- 縦軸は人間と同じような選択をした割合
		- それぞれのモデルについて右に行くほどモデルサイズが大きいものとなっている
		- 大きいモデルほど人間らしい認知に近づくことがわかる
- どの錯視が一番機械でも人間同様起こりやすいか
	- ![image.png](/assets/img/image_1700200673331_0.png){:height 424, :width 352}
	- Perspectiveカテゴリの錯視について一番人間と同様な錯視が起こりやすい
- ## 議論
- 現状そもそもの(zero-shot)性能がまだ不十分な気はする
- 当然VLMもデータセット依存な訳で、直接錯視系のデータが入っているのかどうかや、どういうデータが入っているとより錯視が起きやすくなるのかあたりは興味あるが調べるの大変だろうなという感じ
