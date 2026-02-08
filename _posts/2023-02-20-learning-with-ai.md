---
title: "Why I find it hard to learn with AI"
layout: post
date: 2024-02-20
tags: ['coding']
category: 'article'
---

In the past two years, with the rise of ChatGPT and other coding assistants, I've been wondering what their role is when we learn new subjects. I’ve questioned whether I was learning or fooling myself into thinking I knew the subject.

I started using LLMs (large language models) in the OpenAI playground last year. In the beginning, they helped answer quick questions. I asked them coding questions such as how to compute a Breadth First Search, which would give me good enough code in Python. Now with GPT-3.5 and GPT-4 its become helpful to the point where I question how much I’m doing.

When I used ChatGPT for work, it felt good. I'd just ask it to “build a function that creates a Postgres database connection,” and it would give me an answer in seconds. I’d glance at the code, press enter, and go to the next task.

Then, I used it for my own projects. When trying to learn a new language, I would turn on Github Copilot, an auto-complete that works with OpenAI. This new tool would tell me the type of code I wanted to write even before I knew what I wanted. It felt good to be productive in a new language. It boosted my self-esteem to focus on the latest projects instead of learning the code syntax.  

Github Copilot developers argue that productivity is the point. Microsoft has said 88% of developers feel more productive using the tool and 59% feel less frustrated when coding. 

My question is if we're not really learning anything in this search for productivity and speed. There's a lot of use in opening a Python intro book, reading how more experienced people structure their code, and trying the exercises yourself. Then, slowly build a point of view of what works for you.

One day I turned off Copilot and tried to work on a small project with Rust. When I started writing a function, I knew what to do. But when it got to the code syntax, I was lost. I didn't know what methods to use. I realized I didn't really learn how to code in this language. I was fooling myself; Copilot gave me a false sense of knowledge.

In the search for what went wrong, I researched what goes into learning a programming language and what could be missing when we use Copilot or Chat GPT instead of thinking for ourselves.

## I. Why learning implies friction

> “The fact of the matter is that there will be nothing learned from any challenge in which we don’t try our hardest. Growth comes at the point of resistance. We learn by pushing ourselves and finding what really lies at the outer reaches of our abilities.”

> ― Josh Waitzkin, The Art of Learning: An Inner Journey to Optimal Performance

When I first started learning programming, it was full of friction, I remember first trying to understand how variables worked in Python. I learned you could store them in a stack and a heap. Then I was frustrated I didn’t even know what these two terms meant, so I had to google each one. It turned into an ever-growing awareness of my incompetence. My confidence kept decreasing but I became more aware of what I didn't know.

This whole process was frustrating and took a long time. I recognized that programming wasn't something you learn in 10 minutes; but more like what the programmer Peter Nerving called “Teaching Yourself Programming in 10 Years”.

In a 1994 study on Memory, Robert Bjork introduced the concept of desirable difficulties. He argued that for optimal learning, the difficulty should come from interacting with the content and repeatedly exposing yourself to the same ideas. Having to recall content builds your memory. Each time you tried looking for the proper method to use, scratching your head, and finding it, made you most likely to remember it.

Bjork suggested spaced repetition and mixing concepts as two ideal ways to learn. The first one is building up your memory by recalling concepts before reaching for the answer. The second one overlaps different ideas at the same time. E.g., learning how variables work and reading an article about how computers store memory.

When we struggle with the content, we learn it faster. For some reason, we don't let our brains remember it when we use Chat GPT and other LLM tools. While helpful for our productivity, we might be hindering our long-term learning.

## II. The parts of our brain that shut-off with AI

There’s something with using auto-complete or Chat GPT that turns off the part of our brain that solves problems. I’ve often tried to solve a problem and reach for Chat GPT before I even frame the situation in my head.

Recently, I read an anecdote of a computer scientist who designed a whole program in his head. 

> Andre Benoussan worked with the Multics operating system at Honeywell in Cambridge. [We] were working on a significant change to the file system, which required a new subsystem.

> André took on the job of design, implementation, and test of the VTOC manager. He started by sitting at his desk and drawing a lot of diagrams. I was the project coordinator, so I used to drop in on him and ask how things were going. "Still designing," he'd say. He wanted the diagrams to look beautiful and symmetrical as well as capturing all the state information. I was getting nervous about the schedule, so I was glad when he finally began writing code. He wrote in pencil, at his desk, instead of using a terminal. He declined offers of typing help, and just kept writing away in pencil. He rewrote parts, copied things over, erased and rewrote.

> Finally André took his neat final pencil copy to a terminal and typed the whole program in. His first compilation attempt failed; he corrected three typos, tried again, and the code compiled

I wonder how far away we’re from these examples; and how further the LLM tools separate us from designing solutions with a pencil and a sheet of paper.. In the search for speed and productivity we might be losing our ability to understand what we’re building.

This was better put by Ed Summers in a his article “Why I don’t use Copilot”

> Increasingly I think it’s imperative for programming to be done more slowly, more deliberatively, and as part of more conversations with more people. The furious automation of everything is eating the world.

> Programs need to run more efficiently. Programs need to be well understood, by a more diverse and varied set of people. Programs need to be robust and resilient. Programs need to be easier to change. 

I’ve found learning when I can get the answer in seconds more challenging. People made the same argument with Google and Stack Overflow. I wonder if it's getting worse when we have LLM models designing our code.

Developers become dependent on Copilot for intellectual work. Actually, maybe addicted is a better word here. The same could be (and was) said about the effect of search engines on software development work (e.g., Googling error messages) 

Some research has shown that the Default Mode Network, the part of our brain that’s active when our mind is idle, can give some clues. When we learn new content, the executive part of our brain (the part in charge of making decisions and problem-solving) is most active. While the DMN is less. When we use tools such as Chat GPT or Github Copilot, I wonder if we might shut off the part of our brains that actively engage with the content.

By letting our brains sit idle, and not engaging with the solution we're copy-pasting into the code, we might not know how to debug it, what it does, or whether it contains critical security risks. 

## III. Adding friction to (actually) learn

> Learning is not supposed to be fun. It doesn't have to be actively not fun either, but the primary feeling should be that of effort. It should look a lot less like that "10 minute full body" workout from your local digital media creator and a lot more like a serious session at the gym. You want the mental equivalent of sweating. It's not that the quickie doesn't do anything, it's just that it is wildly suboptimal if you actually care to learn. - Andrej Kaparthy, X Thread

We’ll have many more tools that ease how we code. We might not even need to design websites or applications anymore. There are now LLM bots that can create a website with your specifications or “GPT Agents” that don’t even need that much user input; you tell them your objective and they recursively feed themselves information.

I’d argue that if you're learning a new programming language, you will learn faster with Copilot turned off. And if you're building a new program, it might be better to design it in pen and paper before asking Chat GPT to make it for you.

I asked a few developers on a Discord forum what their approach to learning with Chat GPT has been. Their answers echoed similar concerns.

> ”I've been using GPT for Rust and found it immensely helpful when you ask it specific questions about language syntax or how to structure code in Rust to avoid borrow checker issues"

> “I've disabled Copilot's auto complete in VSCode and instead use it with a shortcut. I've found that this helps me "direct" Copilot better.”

There's truth to their comments, and I think relying too much on these tools fooled me into thinking I knew what I was doing.

Instead of working on a new project and leaving Copilot on, I’ve been trying to turn it off and asking specific questions about the task. 

Another strategy has been writing down what I think the program should do and what could happen when I run the code. I built a view of the whole application before using ChatGPT to fill in the holes.

I’ve also found Anki cards helpful for memorizing programming concepts. Many shared Anki decks can have valuable content related to your interests (e.g., piano chords, rust programming, operating systems).

I doubt ChatGPT will leave anytime soon, and I acknowledge writing code is only one part of the job (albeit one of the more fun ones). As more of the coding gets automated, I’d argue it is even more important to know what we're doing. As we spend more time on high-level tasks such as designing the user experience and drafting the system design, having people who can audit the LLM code and point out its flaws will be more valuable.