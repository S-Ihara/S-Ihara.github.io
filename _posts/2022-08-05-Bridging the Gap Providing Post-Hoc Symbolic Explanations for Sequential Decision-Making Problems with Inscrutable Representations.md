---
layout: page
title:  "Bridging the Gap: Providing Post-Hoc Symbolic Explanations for Sequential Decision-Making Problems with Inscrutable Representations"
subtitle: "reading papers"
date:   2022-07-18
categories: ["papers"]
feature_image: /assets/img/blog/Bridging the Gap Providing Post-Hoc Symbolic Explanations for Sequential Decision-Making Problems with Inscrutable Representations-fig1.png
sitemap:
  priority: 0.5
---

## どんなものか

AIシステムが判断の根拠を説明するためにユーザーが指定した概念による対比的説明を提供する
<!--more-->

### 背景

- 複雑化するAIシステムが判断の根拠を説明することは重要である
- 課題としてユーザーとAIシステム間の語彙の不一致があげられる

そこでタスクのモデルとして不透明なモデルが最善となる逐次的意思決定問題設定に対して、ユーザーが指定した概念による対比的説明を提供する手法を開発する

![スクリーンショット 2022-07-04 20.04.49.png](/assets/img/blog/Bridging the Gap Providing Post-Hoc Symbolic Explanations for Sequential Decision-Making Problems with Inscrutable Representations-fig1.png)

## 先行研究と比べて

従来の説明法としてsaliency mapsなどがあるが、本論文の焦点である逐次的な意思決定タスクのような問題ではうまく一般化しない。そこで人間からの対比的な説明質問に対して説明できる手法を提案した。

## 技術や手法のポイント

- 対比的説明

エージェントが提案する方策$\pi$と行動$a$に対して、ユーザーからの代替案方策$\pi_f$と行動$a_f$に反論する形の説明を生成する。
反論の形として、”$\pi_f$が目標状態に至らない”、”$\pi_f$は無効な状態になる”または”$\pi_f$は$\pi$よりもコストが高い”を示す。

- ユーザーとAIの共通語彙としての概念

概念は説明されるユーザーがタスクに関連づける命題である。例えば”エージェントが梯子の上にいる”、”鍵を握っている”、”頭蓋骨の隣にいる”など局所的な状態を与えるもので構成される。
各概念はタスクに対するドメイン知識を持った専門家からか、ユーザーに環境と対話、観察させて集める。

エージェントはそれら概念に対して2値分類器を学習させることで認識させる。

## 検証方法

- ユーザー調査

以下の仮説を検証するためにアンケートで調査を行なった。

H1: 人々は、箔の情報（すなわち失敗する動作やステップごとのコスト）を直接示す説明よりも、対応するモデルの構成要素を確立する説明を好む

H2: 概念に基づく前提条件の説明は、saliency mapsによる説明よりもタスクの理解を助ける

![H2を調査したアンケートのスクリーンショット](/assets/img/blog/Bridging the Gap Providing Post-Hoc Symbolic Explanations for Sequential Decision-Making Problems with Inscrutable Representations-fig2.png)

H2を調査したアンケートのスクリーンショット

両仮説は統計的に有意であることが示された。

## 議論

- 概念はタスクごとにユーザーや専門家から集める必要がある
- 説明の生成のためにシミュレートが必要