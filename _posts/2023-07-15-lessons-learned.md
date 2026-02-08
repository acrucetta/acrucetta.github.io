---
title: "6 lessons from the last 12 months as a software engineer"
layout: post
date: 2023-07-15
tags: ['reflections']
category: 'article'
---

As I reach another year as a software engineer, I wanted to distill some lessons I learned. Most of them I still struggle with but serve as self-reminders next time I see a similar issue.

## 1. If you want people to care about your idea, bring them along

In this last year, I got to promote new data tools for our team to use. Being in Azure Data Factory, we saw our data pipelines grew in complexity. They were initially designed by an offshore team, we knew how they worked, but we couldn't change them to save our lives. New pipelines were taking 1-2 weeks to build.

I decided to promote new orchestrators such as Dagster. Dagster provided some benefits such as seeing the data lineage, having the pipeline as code, and testing more easily.

When I promoted them, people's first reaction was resistance to change. I knew the benefits, but I didn't ask people what they were struggling with. Since I didn't bring them along at first they didn't see the benefits I was seeing.

The team was concerned with the cost of the tool and whether we could learn it. They also asked me why should we stop using Azure's services, it was easier to keep everything to one platform.

After listening to their concerns, I had to go back and tailor my research to answer their questions. I learned we (engineers) don't work in a silo; I need to involve the operations, infrastructure, and development team when making an architecture decision.

## 2. The developer experience has a huge impact on how fast you release feature

I once read that most of the developer's work in a company was documenting features, attending meetings, and only about 20-30% of the remaining time was spent coding.

This was specially true in this last year. As a small company, we didn't have mature CI/CD pipelines. Every release had to be manually QA'd by the offshore team. We also had to submit a form explaining why we needed to ship the release and stay until midnight to ship it, even if it wasn't a critical feature.

The fear of bringing the system down lead us to fear change. Instead of shipping change constantly we considered new code changes as highly risky. This lead to developers dreading pushing new features so they wouldn't want to stay late.

I learned that proper unit testing, blameless incident calls, and peer reviews were critical to avoiding issues in production. 

## 3. The first employees have a large impact in the long-term tech decisions

Whatever tools the first engineers know have a lasting impact in the tools and architecture you end up working with. If your boss knows .NET you might end up as .NET shop. If your first data engineer loves Postgres you're going to do all your transformations with stored procedures.

Companies in the healthcare sector are particularly risk averse and slower to change. Any new tool has to be thoroughly inspected, go through architecture review and approved by the CIO, the CTO and the infrastructure team.

If you want to work on a particular technology it might make sense to join either a smaller start-up that is more nimble and can adopt it, or join a larger company that is already building with that tool. 

## 4. Even in teams of 1 you can learn from online communities

I found a lot of value in asking people for their advice on our major architecture decisions. Knowing what others have used and their experience led me to prefer tools such as Dagster for orchestration, or Snowflake for data warehousing.

Some of favorite forums were:
- Locally Optimistic Slack - great for data engineering
- Apache Airflow Slack - great for help with Airflow
- DBT Slack - great for help with DBT
- TigerDB Discord - general programming help
- lobste.rs - technical forum with high quality writing

Some areas where I got help:
- Deciding which tools to pick for our data stack; we were debating between Prefect, Dagster, and Airflow
- How to set-up Snowpipes with Snowflake
- How to version control snowflake with Terraform

## 5. Use crisis as opportunity to revamp the infrastructure

During one of our API launches, we released an API that had 2x worse performance than we expected. We only found out once we released it given that we didn't have strong enough checks in our integration pipelines. Some of the prices this API computed were also missing.

We realized we needed to re-evaluate the CI/CD process and what testing we had in place before release. During this process, I read a paper by AWS called "CI/CD as your release captain". This  was part of the really cool series of paper from "Papers We Love", I highly recommend checking their list of papers.

The paper outlined AWS release process. The main takeaways were:
- **Use immutable artifacts and immutable environments in your CI/CD pipeline**. This will help to prevent configuration drift (e.g., Terraform for all config)
- **Enable fast and easy rollbacks**. This is important in case something goes wrong with a deployment.
- **Continuously release code changes using trunk-based development.** This makes it easier to automate the release process to ensure everyone is working on the latest code.

While I didn't fully adopt their method, and I'm not sure whether it makes sense for everyone, I think it gives you an aspirational goal for a good CI/CD pipeline. For me the most important part of it is having an automated process that checks the code, lints it, and enforces all the rules you tend to forget when coding it.

Some of the packages I like for Python are:
- Pre-commit hooks with linting and formatting
- Ruff - combines the best of Pylint and Flake8
- Pytest - run all your unit tests
- Black - for linting

These are some I've liked for DBT:
- Pre-commit hooks using DBT's hooks
- sqlfluff for linting with dbt formatter
- dbt tests - to run the new tests for all the runs

## 6. You don't need a technical team to learn on the job

As the second engineer in our company, I was worried I wouldn't be able to learn as much as if I was in a more established engineering organization. While I still believe there's some benefit to being surrounded by smarter people, I think you can learn on the job and from other people's mistakes online if you are diligent about asking for help.

For DBT related questions, I asked on the DBT slack. If I had data architecture questions I checked with the people on the Locally Optimistic slack. Within hours I had a few people answering based on their own experience.

Many people also recommended these books to ramp up with common data engineering terms:
- Designing Data Intensive Applications
- The Data Warehouse Toolkit 
- SQL Performance Explained 

I learned a lot this past year. I liked the quote that said: 

*A worthy goal for a year is to learn enough about a subject so that you can’t believe how ignorant you were a year earlier.*
