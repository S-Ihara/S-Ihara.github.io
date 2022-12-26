---
layout: page
title:  "Quantifying Attention Flow in Transformers"
subtitle: "reading papers"
date:   2022-10-13
categories: ["papers"]
sitemap:
  priority: 0.7
---

- ## どんなものか  
- Attention RolloutのSelf-Attentionによる情報の流れを定量化する問題を考え, 入力トークンへの注意そ近似する方法としてAttention RolloutとAttention Flowという2つの手法を提案した
- ## 先行研究と比べて  
- TransformerはSelf-AttentionによりAttentionされた埋め込みからの情報を次の層の焦点となる埋め込みの表現に結合させる. よってTransformerの層間では異なるトークンに由来する情報が次第に混在するようになり注意の重みは説明のプローブとして信頼できない.  
- ## 技術や手法のポイント  
- ![image.png](/assets/img/image_1671961901277_0.png)  
- Attention Rollout   
  Attentionのつながりをskip接続を考慮した上で、行列積で近似する。  
	- ![image.png](/assets/img/image_1671961979496_0.png)  
- Attention Flow  
  Attentionの流れを有向グラフに落とし込みフローネットワークとして扱いグラフ理論のアルゴリズムを用いて任意の層の任意のノードから任意の入力ノードへの最大注意フローを計算し, このフローの値を入力ノードへの注目度の近似値として用いる.  
  なおAttention Rolloutに比べて計算時間が非常に多い  
- ## 検証方法  
- 定性的に評価を行なっている  
- ![image.png](/assets/img/image_1671962071547_0.png)  
	- BERTに対するAttention map. マスクの埋め込みから, それに対する2つの参照候補, 例えば（a）では「著者」と「サラ」,（b）では「メアリー」と「ジョン」への注目度合いを見てみます. 左の棒グラフは, 「彼」と「彼女」という2つの代名詞の可能性に対する相対的な予測確率を示している.   
- 左は予測確率であり, aではどちらもauthor(正解)に対するAttentionが強く出ていることが分かる。対してbではAttention flowでのみmary(正解)に対するAttenitonが強くなっている.  
    
  BERTに対するAttention map. マスクの埋め込みから, それに対する2つの参照候補, 例えば（a）では「著者」と「サラ」, （b）では「メアリー」と「ジョン」への注目度合いを見てみます. 左の棒グラフは, 「彼」と「彼女」という2つの代名詞の可能性に対する相対的な予測確率を示している.   
- ## 議論  
- 多くの単純化された仮定をしているため、これらの解釈性には注意する必要がある