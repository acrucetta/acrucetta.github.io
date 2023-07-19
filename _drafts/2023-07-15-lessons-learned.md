---
title: "12 lessons from the last 12 months as a software engineer"
layout: post
date: 2023-07-15
tag: 'reflections'
category: 'blog'
---

I'm approaching a year working as a software engineer at my current company. I thought it would be a good time to stop, reflect, and outline some lessons I've learned in the past year.

Overall, I've felt like I've learned a lot, I've been introduced to new technologies, gotten a lot of responsibility, and challenged myself to take leadership in areas such as data architecture and ETL architecture.

Here are some 6 lessons I've learned.

## 1. Convincing people is a full-time job

In this last year, I've gotten to promote new tools for our team to use. Being in Azure Data Factory, we noted our data pipelines were growing in complexity. They were originally designed by an offshore team, we knew how they worked, but we couldn't change them to save our lives. New pipelines were taking 1-2 weeks to build.

I decided to promote Dagster as a new tool for orchestration. It provided some benefits such as seeing the data lineage, pipeline as code, and easier testing. 

The hardest thing wasn't doing a demo and showing it to my team. It was convincing why we needed to change. 

To every organization there's an inherent friction. Some companies also have a different appetite for change. After promoting the technology and doing the demo I got comments on how expensive it was, how would we host it, and what happens if the company went down. These were not concerns I thought when choosing it.

I learned that the people I needed to convince were not only the developers but also the infrastructure team. 

Since I didn't bring them along in the decision to demo the product, the first reaction was rejection followed by asking why we needed to change if things were *working*. 

Which leads me to the next lesson...

## 2. The developer experience matters

I heard that most of the developer's work in a company was documenting features, attending meetings, and about 20-30% of the remaining time was actually coding.

This was specially true in this last year. As a small company, we didn't have a developed CI/CD pipeline. Every new release had to be manually QA'd by the offshore team. We also had to submit a form explaining why we needed to ship the release and stay until midnight to ship it, even if it wasn't a critical feature.

The fear of bringing the system down with our brittle infrastructure lead us to fear change. Instead of shipping change constantly we considered new code changes as highly risky.

This leads to developers dreading pushing new features so they wouldn't want to stay late.

Because we didn't have thorough unit testing and proper code reviews for each change, we assumed the worst.

## 3. How you make decisions as a team matters

I read the phrase culture eats strategy for breakfast, but it didn't ring a bell until I experienced it first hand.

Who your leadership is, their background, and the type of technical background they have has a profound impact in the tools and architecture you end up working on.

My company was in the healthcare sector, this is an area that is particularly risk averse and slower to change. Any new tool had to be thoroughly inspected, gone through architecture review and approved by the CIO, the CTO and the infrastructure team.

Going through this process could ensure we made a solid decision but it also slowed down how fast we shipped product. In smaller teams, specially startups, being nimble is important. 

This reminded me of the surgery teams popularized by the Mythical Man Moth. Have one person who is the technical leader calling the shots and a series of specialists who suggest improvements. Once the decision is made, everyone needs to commit.

## 4. Forums are extremely helpful

I learned so much from other people and asking in Slack and Discord about challenges we had with our data architecture and tooling. 

Some of favorite forums were:
- Locally Optimist Slack
- Apache Airflow Slack
- DBT Slack
- Dagster Slack
- TigerDB Discord

...