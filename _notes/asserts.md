---
title: "Coding practices"
layout: post
date: 2025-03-26
tags: ['practices']
category: 'note'
---

### Why have style for code?

> “The design is not just what it looks like and feels like. The design is how it works.” — Steve Jobs

> “...in programming, style is not something to pursue directly. Style is necessary only where understanding is missing.” ─ Let Over Lambda

### Tiger Style from Tiger Beetle 

> “The rules act like the seat-belt in your car: initially they are perhaps a little uncomfortable, but after a while their use becomes second-nature and not using them becomes unimaginable.” — Gerard J. Holzmann

**On Lines per Function**

- Restrict the length of function bodies to reduce the probability of poorly structured code. We enforce a hard limit of 70 lines per function.
- Splitting code into functions requires taste. There are many ways to cut a wall of code into chunks of 70 lines, but only a few splits will feel right. Some rules of thumb:
	- Good function shape is often the inverse of an hourglass: a few parameters, a simple return type, and a lot of meaty logic between the braces.
	- Centralize control flow. When splitting a large function, try to keep all switch/if statements in the "parent" function, and move non-branchy logic fragments to helper functions. Divide responsibility. All control flow should be handled by one function, the rest shouldn't care about control flow at all. In other words, "push ifs up and fors down".
	- Similarly, centralize state manipulation. Let the parent function keep all relevant state in local variables, and use helpers to compute what needs to change, rather than applying the change directly. Keep leaf functions pure.

**On Control Flow**

- Use only very simple, explicit control flow for clarity. Do not use recursion to ensure that all executions that should be bounded are bounded. Use only a minimum of excellent abstractions but only if they make the best sense of the domain. Abstractions are never zero cost. Every abstraction introduces the risk of a leaky abstraction.

**On For Loops**

- Put a limit on everything because, in reality, this is what we expect—everything has a limit. For example, all loops and all queues must have a fixed upper bound to prevent infinite loops or tail latency spikes. This follows the “fail-fast” principle so that violations are detected sooner rather than later. Where a loop cannot terminate (e.g. an event loop), this must be asserted.

**On Assertions**

- Assertions detect programmer errors. Unlike operating errors, which are expected and which must be handled, assertion failures are unexpected. The only correct way to handle corrupt code is to crash. Assertions downgrade catastrophic correctness bugs into liveness bugs. Assertions are a force multiplier for discovering bugs by fuzzing.

	- Assert all function arguments and return values, pre/postconditions and invariants. A function must not operate blindly on data it has not checked. The purpose of a function is to increase the probability that a program is correct. Assertions within a function are part of how functions serve this purpose. The assertion density of the code must average a minimum of two assertions per function.
	- On occasion, you may use a blatantly true assertion instead of a comment as stronger documentation where the assertion condition is critical and surprising.	
	- Pair assertions. For every property you want to enforce, try to find at least two different code paths where an assertion can be added. For example, assert validity of data right before writing it to disk, and also immediately after reading from disk.

- The golden rule of assertions is to **assert the positive space** that you do expect AND to **assert the negative space** that you do not expect because where data moves across the valid/invalid boundary between these spaces is where interesting bugs are often found. This is also why tests must test exhaustively, not only with valid data but also with invalid data, and as valid data becomes invalid.

- Assertions are a safety net, not a substitute for human understanding. With simulation testing, there is the temptation to trust the fuzzer. But a fuzzer can prove only the presence of bugs, not their absence. Therefore:
	- Build a precise mental model of the code first,
	- encode your understanding in the form of assertions,
	- write the code and comments to explain and justify the mental model to your reviewer,
	- and use VOPR as the final line of defense, to find bugs in your and reviewer's understanding of code.

**On Warnings**
- Appreciate, from day one, all compiler warnings at the compiler's strictest setting.

**Communication**
- Always motivate, always say why. Never forget to say why. Because if you explain the rationale for a decision, it not only increases the hearer's understanding, and makes them more likely to adhere or comply, but it also shares criteria with them with which to evaluate the decision and its importance.

### References 
- [1] [Tiger Style by Tiger Beetle](https://github.com/tigerbeetle/tigerbeetle/blob/main/docs/TIGER_STYLE.md)