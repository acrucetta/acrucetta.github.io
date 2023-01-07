---
title: "Evaluating Missing Data Methods in ML Projects"
layout: post
date: 2021-12-10 22:10
tag: 
- machine learning
image: 'assets/images/boston_airbnb.jpg'
headerImage: false
projects: true
hidden: true # don't count this post in blog pagination
description: "Missing data in Machine Learning projects."
category: project
author: andrescrucetta
externalLink: false
---
## Testing and comparing the accuracy of different methods

Data in the real world is not clean. Missing values can occur and how you deal with them can impact the accuracy of the findings. Therefore, we plan to look into different methods to handle missing values ranging from simple to complex. We are going to compare the different methods and see which method most accurately and consistently predicts the true value. We will focus on Missing Not at Random. We hypothesize that Singular Value Thresholding and Expectation Maximization with Bootstrapping will perform best.

**Methods to deal with missing data**



* Listwise Deletion: Any individual in a data set is deleted from an analysis if they're missing data on any variable in the analysis
* Imputate with Mean: Add the mean of a particular feature to all missing values in that column.
* Singular Value Thresholding
* Expectation Maximization with Bootstrapping
* K-Nearest Neighbor : Finding the record most similar to the one with a value that is missing and then fill with the most similar record’s value. 

**Dataset Description**

To evaluate each of these methods, we’re going to use two different datasets, one with bike sharing information and another one predicting default on loans. The bike sharing dataset (17k observations, 16 features) can be used to predict how many rides will happen at a particular time using weather patterns and historical data. The loan default dataset (270k observations, 10 features) allows us to predict whether a person is going to default or not on a loan given personal information such as age, income, and whether they own a home.

**Literature Review**

The inspiration for this project primarily comes from the discussion of Singular Value Thresholding, which is discussed in the paper “A Singular Value Thresholding Algorithm for Matrix Completion”. Since we primarily are focusing on SIngular Value Thresholding’s performance for matrix completion, we will use the information provided here as a guideline to set up our project, by ensuring our matrices are low-rank. The paper implies that the rate at which variables are missing should not have a large	 impact on our analysis, as long as the entries are not missing at random. We also will be using “Imputation and low-rank estimation with Missing Not At Random data” as a guideline for completing our project, as they are attempting to answer a similar question to ours. They provide guidance on how to test and compare our results from the various imputation methods with each other, along with best strategies for masking our missing data.



**Project Proposal Bibliography**

General:



1. [7 Ways to Handle Missing Values in Machine Learning](https://towardsdatascience.com/7-ways-to-handle-missing-values-in-machine-learning-1a6326adf79e) 
2. [A survey on missing data in machine learning - Journal of Big Data](https://journalofbigdata.springeropen.com/articles/10.1186/s40537-021-00516-9) 
3. [Bootstrap Inference when using Multiple Iterations](https://arxiv.org/pdf/1602.07933.pdf)
4. [Working with Missing Data in Machine Learning](https://towardsdatascience.com/working-with-missing-data-in-machine-learning-9c0a430df4ce)

Datasets:



1. [Capital Bikeshare](https://archive.ics.uci.edu/ml/datasets/bike+sharing+dataset) 
2. [Loan Prediction Based on Customer Behavior](https://www.kaggle.com/subhamjain/loan-prediction-based-on-customer-behavior) 

Literature Review:



1. [ “A Singular Value Thresholding Algorithm for Matrix Completion”](https://arxiv.org/pdf/0810.3286.pdf)
2. [“Imputation and low-rank estimation with Missing Not At Random data”](https://arxiv.org/pdf/1812.11409.pdf)
