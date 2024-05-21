---
title: "Lessons adding new tools to a startup"
layout: post
date: 2024-05-20
tag: 'coding'
category: 'article'
---

It can be hard to make decisions at a startup. Things change, and the tools you choose today may not work tomorrow. 

When I first joined my startup, I was thrown into a messy codebase written by offshore contractors. We were using 50+ Postgres stored procedures without version control. We had over 200 Azure Data Factory pipelines but only used about a dozen. It was a nightmare.

I spent months wrestling with these tools, only to learn there was no incentive to change them at the time. We had to wait for a new window of opportunity to improve things. It was a harsh lesson as a young developer: you can't always change tools mid-project. Sometimes, you have to make do with what you have.

## I. Dealing with changing requirements

When we launched our first product, it didn't make enough money. So, we had to pivot to a new idea. This allowed us to improve our architecture.

Initially, we thought we would use unstructured data, so we chose Elastic Search, a NoSQL database used for text search. We built all of our production APIs around it. But, as we learned more about the data, we realized our structure needed to be simplified. We merged many SQL tables into a massive JSON document, which we queried from Elastic.

Once we recognized our mistake, we reverted to structured data, splitting the JSON document into multiple tables. Although a traditional SQL database was better, we had built all our APIs around it. Making it hard to switch.

This taught me that while it's essential to adapt to changing requirements, it's crucial to consider the long-term impact of architectural decisions. Some tools APIs, like Elastic, can be harder to change than if we had gone with a more flexible database like Postgres or Snowflake.

## II. Refactoring vs. New Tools

Our data team faced a similar issue. We needed version control for our offshore team's work. I suggested we move to DBT and Airflow for version control. We eventually adopted DBT but stuck with Azure Data Factory.

Our initial experience with Azure Data Factory was frustrating because of poorly structured code. But we realized the tool wasn't the problem; it was how we used it. 

We chose to refactor our code and make better use of ADF. Moving to DBT early in the product launch was a good decision since we could start fresh. But with ADF, we had to improve what we had.

This taught me a crucial lesson: sometimes, it's better to refactor and optimize existing tools rather than switch to new ones.

## III. Focus on shipping features

Over the past two years, I've realized that if you're building a startup, you can't spend too much time debating what tools to use or constantly refactoring your codebase. It's almost always better to focus on shipping new features and taking advantage of newer projects to introduce new tools. 

Most clients don't care if you're running on the "modern data stack." They are the product works. Even though it's easy to fall in love with tools as developers, tools by themselves are not a panacea.

This is a harsh lesson to learn, but it gives you the freedom to spend the time solving the problems that matter. Tools are essential, but the real value lies in solving problems for the people paying you.