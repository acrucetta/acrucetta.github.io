---
title: This data will make you rethink how you Airbnb in Boston
description: >-
  If you’ve been to Boston you’ve probably wondered which are the best
  neighbourhoods to stay in for tourists
date: "2020-04-13T13:45:11.178Z"
categories: []
keywords: []
slug: >-
  /@andrescrucetta/this-data-will-make-you-rethink-how-you-airbnb-in-boston-dff227e80732
category: "article"
layout: post
---

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/0__ALz__eTYgDvYCpMlt.jpg)

If you’ve been to Boston you’ve probably wondered which are the best neighbourhoods to stay in for tourists

If you’ve been thinking of being a host you’ve probably taken steps towards making sure your listing is up to the standards of top hosts and to open your listing at the right time.

I’ve also asked myself these questions. Hence, I analyzed the Boston [Airbnb Database from Kaggle](https://www.kaggle.com/airbnb/boston#listings.csv) to answer them. This dataset is part of the [Airbnb Inside initiative](https://insideairbnb.com/index.html), sourced from publicly available information from the Airbnb site.

**In short, through this article you will learn:**

- Which neighbourhoods in Boston are more expensive than others?
- Which areas are busier at different times of the year?
- What type of comments top hosts get vs. low performing hosts?
- What contributes the most to a top rating for your Airbnb listing?

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/0__diwnmleePuhvzbDT.jpg)

#### Which neighbourhoods in Boston are more expensive than others?

Boston can be an expensive town, with Airbnb listing prices ranging from $ 75 in Mattapan to $256 in the South Boston Waterfront.

According to [Adventurous Kate’s blog](https://www.adventurouskate.com/where-to-stay-in-boston-best-neighborhoods-and-accommodation/), these are the most touristy neighbourhoods in Boston:

- **Back Bay**: it’s beautiful, central, well-connected, and home to fabulous parks, shopping, and nightlife
- **North End**: best neighborhood for history lovers
- **South End**: best neighborhood for foodies

Based on the analysis, these are all neighbourhoods with an above average price and a high number of listings. As seen in the graph below, the sweet spot for a neighbourhood is an above average number of listings with an average price.

Neighbourhoods that become good options are: Back Bay, Beacon Hill, South End, Fenway, and Jamaica Plain.

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/1__bEizP5kQ1YS9H6VDQoo__Lg.png)

#### Which areas are busier at different times of the year?

Whenever you decide to visit, it’s important which listing you pick, but also which neighbourhood and at which time of the year you choose to visit.

Overall, all neighbourhoods in Boston are busier in **September** and **October** than any other month of the year.

Some neighbourhoods fluctuate depending on the season.

**Fenway** is busier during baseball season (march to september) than any other month of the year.

**Longwood Medical Area** is busy on September and October for medical conferences and doctor visits.

The busiest neighbourhoods are **Mission Hill, Alston, and Chinatown.** These three neighbourhoods are mostly booked in the summer when tourists flock to Boston to visit its buzzling shopping district and sunbathe in the Charles River Walk.

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/1__M3tKmoGnUsEuPxbuf5iqnw.png)

#### What type of comments top hosts get vs. low performing hosts?

There’s a stark difference between a great host and an ‘alright host”. For a top performing host we may write the listing was “amazing”, “wonderful” or “fantastic”. For listings that weren’t as good, your comment may have looked more like “needs to be cleaned”, “too small”, “has a problem”.

I had a similar hunch, and therefore went on to use Python’s Wordcloud to analyze the most common words in Airbnb reviews for our Boston dataframe.

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/1__eDTYwVWoRyaEi__bsAn8khg.png)

Our figure above, shows that for top hosts — 97+ rating — the most common words were lovely, wonderful, and beautiful. We normally relate these to emotions. That is, the best hosts provoke in us strong emotions with their listings.

A top rating that provokes strong emotions, and even make us remember childhood memories in our dad’s tree-house may look like this.

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/0__QlytVPLGrC01BkCF.jpg)

On the gloomier side, when the listing is not as nice, the comments are more related to its cleanliness and space. Reviewers tend to remark how it was just “convenient” or “clean”. Others that the listing was “small” or there was something wrong with the “bathroom”.

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/1__O6hYu6beAsar3Nffu__afRw.png)

A low performing listing may look like this, too small, in a basement, and a dubious color palette for the space.

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/0__ErKLDAzWJCP2Sd4A.jpg)

If you’re thinking about posting a listing in Airbnb, think about, what emotions can you provoke in your hosts.

Is there a particular food popular to your area, say an “arepa” if you post it in Colombia, or a “dulce de leche” cake if you post it in Mexico City.

Sharing these emotions with your hosts can go a long way.

#### What contributes the most to a top rating for your Airbnb listing?

To provide quick tips, I’ve used Python’s sklearn to plot a linear regression of the factors that influence an increase in your overall Airbnb rating.

**If you want a 2–2.5 points increase** in your listing, think about how can you price your Airbnb more efficiently for the area or how can you have a cleaner space for your hosts.

**If you want a 1.5–2 points increase** in your listing, think about how can you more accurately portray your listing, communicate better, or have a better check-in experience.

**Things that didn’t really affect the rating?**, your listing price, how many listings you have or your number of reviews.

While this may seem counter-intuitive, your number of reviews and listing price guides a guest towards your listing. This a “before-the-fact- event. Before they rate it.

After the guests visit, the quality of your space becomes the next impression. They perceive the value of what they paid for, its cleanliness, and how accurate the listing was to the pictures.

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/1__93J7oDWRXOK7hxuFZGA__Dw.png)

### **Key Takeaways**

**If you’re visiting Boston:**

- Pick a good balance of price and value. South End, Fenway, and South Boston are all great options to stay at.
- Pick the right time of the year, for the right neighbourhood. Avoid Fenway during the summer or Longwood Medical Area in the Fall.

**If you want to increase your listing rating:**

- Provide an emotional connection between your guest, the listing, and your community. Think of what type of food or decoration can you make available for your hosts that leave them with a lasting memory.
- Provide a good balance of value and price for your listing, maintain the place clean, and be accurate in your pictures.
