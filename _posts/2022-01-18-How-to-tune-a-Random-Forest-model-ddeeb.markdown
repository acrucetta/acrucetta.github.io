---
title: How to tune a Random Forest model
description: Exploring the most influential parameters to tune
date: '2022-01-18T21:28:09.432Z'
categories: []
keywords: []
slug: /@andrescrucetta/how-to-tune-a-random-forest-model-d196dee167b8
category: 'article'
layout: post
---

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/0__4s3__xYiz1pgorrSv.jpg)

#### What are the Random Forest parameters?

The random forest (RF) algorithm was first introduced by Breinman in 2001. It has now grown to become a standard tool for predicting data without making any prior assumptions of the features and the labels. To improve the performance of your Random Forest model you need to tune a set of hyperparameters that includes:

1.  the structure of each individual tree (e.g., minimal size a node should have to split)
2.  structure of the forest (e.g., the number of trees)
3.  its level of randomness.

Developers may gain the **most improvement in their model by tuning the structure of each individual tree** (also known as mtry). They can gain medium improvements by tuning the sample size and a lower improvement by tuning node size.

#### Improving the _mtry_ parameter

The parameter to change the structure of each individual tree, mtry, is defined as the number of randomly drawn candidate variables out of which each split is selected when growing a tree.

**Lower values of mtry** can lead to more different, less correlated trees. They can also better exploit variables with moderate effect on the response variable, that would otherwise be masked by variables with strong effect. They perform worse on average since sometimes you end-up with sub-optimal variables. If there are many relevant variables, we recommend choosing a low mtry. This can help to not only choose the stronger variables in the splits, but also the less influential ones that might be helpful to predict small groups of observations.

**If mtry is large,** the less influential variables might not have a chance to contribute to prediction because the stronger variables can mask the smaller effects. However, if there are few relevant variables, a large entry can be a good choice.

In order to change these parameters for the dataset, the paper explores grid search, random search, and sequential model-based optimization (SMBO). Out of these three methods, they recommend using SMBO. This method works by iteratively trying to find the best hyperparameters based on evaluating the hyperparameters that were used beforehand. It is grounded in the “black-box function optimization literature”. There’s an R package called mlrMBO that helps one use it.

To evaluate the performance of the algorithm, the authors recommend using either the k-fold cross-validation or the out-of-bag observations method. Evaluating it based on the out-of-bag method can be faster. The evaluation metric will depend on the problem, however, two of the most commonly used methods for classification are the classification error rate and the Area Under the Curve (AUC).

In summary, tuning random forest models can improve their performance, although the effect of tuning is much smaller than for other algorithms (such as Support Vector Machines). They recommend using SMBO to tune the algorithm and then use an out-of-bag method to evaluate each iteration of the tuning algorithm.

#### **References**

*   Hyper parameters and Tuning Strategies for Random Forest ([https://arxiv.org/pdf/1804.03515](https://arxiv.org/pdf/1804.03515))