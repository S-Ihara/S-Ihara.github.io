---
layout: page
title:  "A Benchmark for Interpretability Methods in Deep Neural Networks"
subtitle: "reading papers"
date:   2022-05-29
categories: ["papers"]
feature_image: /assets/img/blog/A Benchmark for Interpretability Methods in Deep Neural Networks-fig1.png
sitemap:
  priority: 0.3
---

## どんなものか

vanilla gradient系の説明手法（backprop, smooth grad, var grad）に対して特徴量重要度評価法を提案した。具体的には重要だとハイライトされた部分を隠しモデルを通す評価方法を見直し、削除と再学習を行い評価するROAMという手法を提案した。
<!--more-->
## 先行研究と比べて

saliency mapsの評価方法として、重要だと示されたハイライト部分を隠しモデルの予測を計算し予測確率の低下を見るものがある。この方法は画像を隠した際にその隠した画像というのが異なる分布となる（モデルの想定されていないデータとなる）ことが上げられる。

## 技術や手法のポイント

重要であるとされる部分を隠したデータ（訓練データ、テストデータ）を用いて新しくモデルを再学習し、そのモデルの精度がどのように低下するかで評価を行う。

またランダムなベースライン（重要である部分を隠す代わりにランダムなピクセルを隠す）との比較により解釈可能性手法が正確であるかを調べることができる。

## 検証方法

再学習の必要性について

![論文Figure 3：左は再学習を行わない場合、右は再学習を行なった場合](/assets/img/blog/A Benchmark for Interpretability Methods in Deep Neural Networks-fig1.png)

論文Figure 3：左は再学習を行わない場合、右は再学習を行なった場合

実際に図3より再学習を行わない場合はランダムなベースラインより性能が良いと出るが、再学習をするといずれの手法（GRAD, GB, IG）も性能が低いと出る。ここからも再学習が必要だと言える。

imagenet, food, birdsnapの3つの大規模オープンソースデータセットをResNet-50のモデルを用いて行う。また評価を行うための説明性手法はvanilla gradient(GRAD), Guided Backprop(GB), Integrated Gradients(IG), SmoothGrad(SG, SG-SQ), VarGrad(VAR)を用いる。

実験は各データセットと推定量に対して修正割合 t = [0,10,30,50,70,90](%)に対応する新しい学習セットとテストセットを生成し行う。そしてランダムな初期化から5つのResNet-50モデルを独立に学習させ、テスト精度はこれらの平均とする。

![論文Figure 4: 左（GRAD,IG,GB）は特徴の重要度をランダムに割り当てるよりも性能が劣る。中央（SG）はランダムな重要度割り当てよりも精度が低く、しばしば単一の推定値よりも悪い。右図（SG-SQ, VAR）は全てのデータセットにおいて他の手法をはるかに凌駕している。](/assets/img/blog/A Benchmark for Interpretability Methods in Deep Neural Networks-fig2.png)

論文Figure 4: 左（GRAD,IG,GB）は特徴の重要度をランダムに割り当てるよりも性能が劣る。中央（SG）はランダムな重要度割り当てよりも精度が低く、しばしば単一の推定値よりも悪い。右図（SG-SQ, VAR）は全てのデータセットにおいて他の手法をはるかに凌駕している。

## 議論

画像を隠すことによる画像の不自然さ（モデルの想定していないデータ、分布が異なるデータ）を取り払うシンプルで分かりやすい良い評価法であるが、評価のために再学習が要求されるのはややコストが重い気がする。

今回はgradient baseのsaliency mapsだけであったが他のsaliency mapsの手法（grad camたちや摂動ベース、隠蔽ベース（RISEなど））で行なった場合でも正しそうに評価できるか気になった。
