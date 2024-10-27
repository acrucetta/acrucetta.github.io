
---
title: "Testing"
layout: post
date: 2024-10-27
tag: 'testing'
category: 'note'
---

## Notes from Art of Unit Testing

### Basics of Unit Testing
- You should write tests for the units of work
- Units of work have entry points and exit points; normally you write a separate test for each exit point
- A unit of work can be as small as a function or as much as multiple modules depending on how many things span the entry point and exit point

```javascript
let total = 0;
const totalSoFar = () => {
  return total;
};
const sum = (numbers) => {
const [a, b] = numbers.split(',');
const result = parseInt(a) + parseInt(b); 
total += result; // exit point 1
return result; // exit point 2
};
```

Dependencies:
- Some testing may have dependencies, dependencies normally call third parties. If it runs in your own system, in-memory, its probably not one
  - If a logger writes to a database, it is a depedency

On mocks:
- Most of the tests should use either return-value-based or state-based tests. Avoid mock-object based tests. (i.e., no more than 5% use mocks to verify)

Checklist for unit tests:
-  Can I run and get results from a test I wrote two weeks or months or years ago?
-  Can any member of my team run and get results from tests I wrote two
months ago?
-  Can I run all the tests I’ve written in no more than a few minutes?
-  Can I run all the tests I’ve written at the push of a button?
It should run in memory without requiring system files, networks, or databases. It should be as synchronous and linear as possible when that makes sense (no parallel threads if we can help it).
-  Can I write a basic test in no more than a few minutes?
-  Do my tests pass when there are bugs in another team’s code?
-  Do my tests show the same results when run on different machines or environ-
ments?
-  Do my tests stop working if there’s no database, network, or deployment?
-  If I delete, move, or change one test, do other tests remain unaffected?- A logger is not a depedency

### Integrating tests into an org

Testing strategies fail when we have too many high level or low level tests. Features are not considered all the way through.

> A test recipe is a simple list of 5 to 20 lines of text, detailing which simple scenar- ios should be tested in an automated fashion and at what level. A test recipe should give you confidence that, if all outlined tests pass, the feature works as intended.

You can start writing the test recipes before you start coding a feature or user story.

E.g.,
```
  User profile feature testing recipe
    E2E – Login, go to profile screen, update email, log out, log in with new
        email, verify profile screen updated
    API – Call UpdateProfile API with more complicated data  
    Unit test – Check profile update logic with bad email
    Unit test – Profile update logic with same email
    Unit test – Profile serialization/deserialization

```

Test level anti-patterns are organizational in nature. E.g., separated QA and dev departments create different types of tests.

Tips:
- Describe a testing recipe: write down tests when you start working on a feature
- Show it to the rest of the team, have not only code reviews but test reviews
- Communicate what you expect to test in each feature. E.g., units of work, entry, exit points


## Tips

### Test at the boundaries
- Don't test implementations, test what your module exports
  - i.e., a new class or method is not reason enough for a test
  - aka test the boundaries or your program's API

### Test systems
- With more parallelization and cloud infrastructure, you can test the full system

### Don't overuse mocks
- Tests can be harder to maintain. You leak implementation details. If your code changes, you need to update these too.
- They provide less assurance, you tell them how to behave.
- If you're mocking out more than one or two classes you might be using them too much

## Resources 
1.  [https://www.youtube.com/watch?v=EZ05e7EMOLM&t=1803s](https://www.youtube.com/watch?v=EZ05e7EMOLM&t=1803s)
2.  [https://dhh.dk/2014/tdd-is-dead-long-live-testing.html](https://dhh.dk/2014/tdd-is-dead-long-live-testing.html)
3. [https://testing.googleblog.com/2013/05/testing-on-toilet-dont-overuse-mocks.html](https://testing.googleblog.com/2013/05/testing-on-toilet-dont-overuse-mocks.html)
