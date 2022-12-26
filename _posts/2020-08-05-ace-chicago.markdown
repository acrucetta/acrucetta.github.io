---
title: "How Crime is Affecting Chicago's Future Generations"
layout: post
date: 2020-08-05
tag: 'data exploration'
category: 'project'
---
[Read the Medium article here](https://medium.com/@andrescrucetta/how-crime-is-affecting-chicagos-future-generations-2cd48355ed14)

### Defining the problem
This notebook is part of the final project for the Udacity Data Science Capstone Project. In it, I'm going to explore community areas in which there are the most Adverse Child Experiences and the type of community health resources available to Children.

My goal is to determine those areas in danger, and share the findings with the Chicago Public Health Department through a web application and Medium post.

My assumption before embarking in this search is that communities with less access to grocery stores and community hospitals suffer higher likelihood of health disease and have a lower mortality.

I'm going to evaluate this data two ways:
*   **GIS**: What are communities with higher density of Adverse Childhood Experiences? (e.g., lung disease, alcohol abuse, mental illness)
*   **Statistically**: What neighborhood information is more likely to inform us whether they have Adverse Childhood Experiences (e.g., income, lack of community resources)

### What are Adverse Childhood Experiences?

Adverse childhood experiences (ACEs) are traumatic events occurring before age 18. ACEs include all types of abuse and neglect as well as parental mental illness, substance use, divorce, incarceration, and domestic violence.

A landmark study in the 1990s found a significant relationship between the number of ACEs a person experienced and a variety of negative outcomes in adulthood, including poor physical and mental health, substance abuse, and risky behaviors.1 The more ACEs experienced, the greater the risk for these outcomes. By definition, children in the child welfare system have suffered at least one ACE. Recent studies have shown that, in comparison to the general population, these children are far more likely to have experienced at least four ACEs (42 percent vs. 12.5 percent).2

Source: Child Welfare Information Gateway

### What are types Adverse Childhood Experiences?
<div>
<img src="https://www.npr.org/assets/img/2015/02/20/aces-1_custom.jpg" width="600"/>
</div>

### How do Adverse Childhood Experiences affect kids development?
<div>
<img src="https://socialworksynergy.files.wordpress.com/2013/12/ace-pyramid-cdc.gif?w=369&zoom=2" width="500"/>
</div>

### Data Sources
*   https://data.cityofchicago.org/
