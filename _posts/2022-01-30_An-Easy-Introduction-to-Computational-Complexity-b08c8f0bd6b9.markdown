---
title: An Easy Introduction to Computational Complexity
description: >-
  As complex as Computational Complexity may sound, it is one of the fields that
  can win you a million dollars. One of the deepest questions…
date: '2022-01-30T17:55:38.694Z'
categories: []
keywords: []
slug: /@andrescrucetta/an-easy-introduction-to-computational-complexity-b08c8f0bd6b9
category: 'article'
---

![](/Users/andrescrucettanieto/Documents/GitHub/markdown-converter/posts/md_1672369357164/img/0__V8xnDwq4nqD4Piow.jpg)

As complex as _Computational Complexity_ may sound, it is one of the fields that can win you a million dollars. One of the deepest questions in computer science is the P vs. NP problem. It is part of the most important unsolved questions in mathematics.

To provide some background on the P vs. NP question, we need to first talk about algorithms. Algorithms are commonplace in our daily lives, on any given day you may use hundreds without even realizing it. Just to provide one example, when you pull out your phone and add directions to a grocery store, your phone is following an algorithm. This algorithm has one task: find the shortest path from your house to the grocery store.

Each of these algorithms take some time to answer each question. Some algorithms are faster than others. For example, to sort people in a group by height, you can either swap each person one by one, or you can divide them into two groups, sort those groups separately, then merge them. Each of those methods would take you different amounts of time, and that’s what computer scientists are trying to constantly find and measure. How long will this task take, and how does it compare with other methods?

This is what the P vs. NP problem is about. P is a set of algorithms that take an amount of time called “polynomial time”, think n2 or n3. These problems are fast for a computer to solve, so are considered “easy”. NP problems are fast for a computer to check, but they can be hard to solve. An example of an NP problem is a Sudoku puzzle. For a typical computer, checking the Sudoku is correct is easy, solving a large puzzle can take exorbitant amounts of time. The P vs. NP question asks, if we’re able to check for the answer of these problems, would it also be easy to find a solution?

This is all part of the field of _Computational Complexity._ The field asks, how long would an algorithm take to run, and how many resources do we require to run them.

An important part of Computational Complexity is figuring out how many resources do we need to solve a particular problem. These resources can be thought of in terms of _time complexity_ and _space complexity_. Time complexity is the amount of time an algorithm takes to solve a problem. In this case, “time” can mean the number of operations the algorithm has to perform. Space complexity describes the amount of “memory” the algorithm needs to use to solve this problem. Both of these measures are important for computer scientists to use, they tell us how efficient an algorithm is in solving a problem.

Algorithms can’t know ahead of time what will be their input. In the example of sorting people by height, we don’t know ahead of time how many people we’ll have to sort. Algorithms need to be efficient enough to work with a large number of people. In order to measure this efficiency of an algorithm, we use a term called: _asymptotic complexity._ It is perhaps one of the most important concepts in computer science.

Asymptotic complexity states, when the number of people we have to sort goes to infinity, what happens to the performance of the algorithm. This is called the Big O notation and denotes it with O(1), O(n), or O(n³). When an algorithm runs in constant time O(1), it takes the same number of steps no matter how large the input size increases. An example would be finding the first person in a list. No matter how many people we have in the list, it will always just take one step. When an algorithm runs in logarithmic time (O(logN)), the time increases proportionally to the logarithm of the input size. When it runs on linear time, the steps increase in direct proportion to the size, we call this O(N).

The complexity of algorithms starts at a constant time O(1) and can reach up to exponential O(2^N) or factorial time O(N!). An example of this would be if you have an input of 10 people to sort, a constant time algorithm would take 1 step. An exponential time algorithm would take 1024 steps. A factorial time algorithm would take 3.6 million steps!

Algorithms need to be flexible enough so that they don’t take an exponential amount of time to solve. The brightest people are working on problems ranging from sorting numbers to finding the shortest path from A to B. For some of these problems, such as sorting numbers, we have plenty of solutions: merge sort with O(nlog(n)) complexity, and bubble sort with O(n²) complexity. For other problems, such as finding the shortest path, there’s no clear solution (this is a NP problem). Choosing an algorithm that is efficient will not only save you time from waiting for the problem to run, it may also save time and money from your company’s computers.

Even if we don’t find the solution to P vs. NP within our lifetimes, we have plenty of “P” algorithms to choose from. Computational complexity is a great concept to have in your toolkit every time you’re about to code. It can make the difference between an average software engineer and a great software engineer.