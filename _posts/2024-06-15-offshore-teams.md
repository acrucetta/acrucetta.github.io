---
title: "Pros and cons of offshore teams"
layout: post
date: 2024-06-15
tag: 'startups'
category: 'article'
---

Startups offshore their tech teams to save money, rush a product, or save time recruiting. They can be great if you know how to use them. If you don't, you can end up maintaining code you barely understand and paying massive fees for a contractor you can't get rid of.

I had an experience like this when I joined my startup as one of the first two technical hires. At that time, the company was a year old and got VC funding to launch a product to help people save money on prescription drugs.

When I first joined, I noticed all the code was outsourced. The front end was contracted to a company that charged thousands of dollars per website. The back-end and the databases were managed by a consulting firm like Cognizant or Accenture. 

Our role was to be the first two engineers "onshore" and learn how the technology worked, so we didn't depend as much on the offshore teams.

I quickly realized how difficult this task was. The tech architecture lived on someone else's head, on opposite business hours, and had little documentation. 

Contractors can be cheap, but they can come at a high cost.

## Perils 

### More people, more money

Offshore teams want to keep doing more work for you. You only want to pay them for what you need. You want a working website, database, or API. They want to build a good solution and help you maintain it. 

In consulting firms, I saw this dynamic. We would finish a project. Then, the director would find ways to sell more work to the client. 

*"Behold, if you don't do this new project, your IT team will be in trouble. But we have a solution for you. We have done it with many clients, and it will come at a cheap cost."*

You might need 1-2 sound engineers in small startups to build a product. You only have a few processes because you don't need them. One engineer writes code, the other reviews it, and the knowledge bounces around two heads.

Once you start adding more heads, you need processes. You need meetings to discuss the code changes (ensure it won't affect other teams). You need town halls to align everyone on the *technology vision*. You need to pair engineers with each other so they teach each other.

### Sharing context

A second issue is that it's hard for offshore team members to know how your product works. They're not in the daily product meetings or hear about business updates in the lunch room. You need to work twice as hard to give them half the context they would have been around the other teams.

This can come at the cost of more meetings, *knowledge transfer* sessions, and slower progress.

### Not knowing how your tech works

The last issue is you might build knowledge siloes. If you don't know what they're coding offshore, you might tie yourself by the hip to the contractor.

Our database had dozens of SQL stored procedures that didn't have comments and ran at mysterious hours. An offshore team member handmade an orchestrator that ran this code a year before I joined. 

We couldn't get rid of him, even if we wanted to. If he decided to become a full-time bread baker, we would have been screwed. 

## Perks 

Having an offshore team does have some perks. You save money, they're on a flipped schedule, and hiring more people is more manageable. This is why most teams get them at first (In my experience, this happens more often at smaller startups with non-technical founders)

One perk is that you can get your product kick-started cheaply. Up to 2022, founders were able to raise $5MM and hire a team of 5 engineers for 2 years. After the bubble burst that summer, seed startups can now look to raise up to $1MM. It makes sense to hire a small offshore team. You can then bring more expensive local engineers.

Another perk is that if you have engineers onshore and offshore, you can have a "never-ending" work schedule. Your onshore engineers can delegate the work overnight and review the code the following day.

The last perk is you can hire people faster. Finding a good data engineer took up to 2-3 months. Offshore companies have a pool of people available at any time. Although the quality could be better, they do the job if you're in a rush.

## Lessons learned

### Know your tech

If you hire contractors, you should know your tech architecture like the back of your hand. 

I could barely understand our data pipelines and stored procedures when I joined. Nothing used version control, and the code changed mysteriously overnight. 

We had to rebuild the data pipelines in a way that made sense and document our decisions. This allowed us to train people joining the team and to debug issues faster.

One of our main decisions was moving from Postgres stored procedures to DBT. This lets us enforce code reviews with the offshore team. We had way fewer production issues after.

### Learn what they do offshore

At least one person on your onshore team should know how things work. 

If the only person who knows how your API works is offshore and is asleep when something breaks. You're in for a bad time.

### Write good documentation and review code 

This applies to remote employees and contractors. If you don't have the luxury of being in the same place, you need good processes to review the code.

This includes pull requests, pre-commit hooks, good continuous integration pipelines, code reviews, and architecture diagrams.

I expect offshore teams to keep growing with more people learning to code outside the United States. Some examples are [Laboratoria](https://www.laboratoria.la/en) (training women to code in South America) and [Andela](https://andela.com/) (training people to code in Nigeria). These programs are bringing more people to the market ready to work remotely. 

They can be a great addition to your team if you know how to manage them effectively. Knowing how to handle offshore teams will only become more relevant over the next few years.