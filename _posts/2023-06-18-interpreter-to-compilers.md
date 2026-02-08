---
title: "My journey from interpreted to compiled languages"
layout: post
date: 2023-06-18
tags: ['compilers']
category: "blog"
---

Recently, I finished the "Writing an Interpreter in Go". As I started reading the sequel, I found myself puzzled by the shift from interpreting source code to compiling it into code for virtual machines. This prompted me to understand the concept of compilers, Bytecode, and the reasons behind its efficiency.

In the first book, the workflow was straightforward:

```
Source Code
|
| (Lexer)
v
Tokens
|
| (Parser)
v
Abstract Syntax Tree (AST)
|
| (Evaluator)
v
Output
```

The Lexer transforms the source code into tokens. These tokens are then parsed into an Abstract Syntax Tree (AST) based on predefined rules, and subsequently evaluated to produce the final output.

However, in the sequel, the workflow takes a different turn:

```
Source Code
|
| (Lexer)
v
Tokens
|
| (Parser)
v
Abstract Syntax Tree (AST)
|
| (Compiler)
v
Bytecode
|
| (Virtual Machine)
v
Output
```

In this new workflow, the AST is compiled into Bytecode instead of being directly evaluated. The Bytecode is then executed to produce the output.

Let's take an example:

```
Source Code:

def add(a, b):
return a+b
AST:

FunctionDef
|-- name: "add"
|-- args: Arguments
| |-- args: ["a", "b"]
|-- body: Return
|-- value: BinOp
|-- left: "a"
|-- op: Add
|-- right: "b"
```

This is then converted into Bytecode:

```
LOAD_FAST 0
LOAD_FAST 1
BINARY_ADD
RETURN_VALUE
```

Finally, the virtual machine translates this into:

```
mov eax, [ebp+8]
add eax, [ebp+12]
ret
```

This final form may seem like an alien language to the uninitiated, but it's the language our hardware understands and executes.

## The Rationale Behind Bytecode

The book cites efficiency, portability, and optimization as the primary reasons for this conversion to Bytecode.

### Efficiency: Streamlining Functions

Bytecode, being more compact and faster to decode than high-level source code, allows virtual machines to execute it more rapidly than an interpreter can execute source code.

Consider this factorial function:

```
def factorial(n):
  if n == 0:
    return 1
  else:
    return n \* factorial(n-1)
```

When compiled to Bytecode, it becomes:

```
0 LOAD_FAST 0 (n)
3 LOAD_CONST 1 (0)
6 COMPARE_OP 2 (==)
9 POP_JUMP_IF_FALSE 16
12 LOAD_CONST 2 (1)
15 RETURN_VALUE
16 LOAD_FAST 0 (n)
19 LOAD_FAST 0 (n)
22 LOAD_CONST 3 (1)
25 BINARY_SUBTRACT
26 CALL_FUNCTION 1
29 BINARY_MULTIPLY
30 RETURN_VALUE
```

This Bytecode is more efficient because it transforms the recursive function into a loop, reducing the overhead of creating a new stack frame with each recursion.

### Portability

Bytecode can be interpreted by any virtual machine, enhancing its portability. For instance, in Java, the Java Virtual Machine (JVM) executes the .class files, which are Bytecode, making Java programs platform-independent.

### Optimization Opportunities

Bytecode offers opportunities for both compile-time and run-time optimizations.

#### Compile-Time Optimization

Compile-time optimization occurs when the code is converted to Bytecode. For instance, consider this C code:

```
int x = 5;
int y = x \* 10;
```

Since x is a constant, we can directly store the final result in the Bytecode:

```
int x = 5;
int y = 50;
```

#### Run-Time Optimization

Run-time optimization involves "Just-In-Time" (JIT) compilation, which compiles parts of the program during execution. This approach is different from the traditional "ahead of time" compilation (as in C) or line-by-line interpretation (as in Python).

JIT compilation profiles the code during its conversion to Bytecode, identifying "hot spots" - areas that are frequently executed or time-consuming. These hot spots are then converted into machine code specific to the hardware being used. This machine code is stored in a cache and can be reused whenever the code is executed again, improving performance.

In the next installment of this compiler series, I'm going to explore the different types of machine codes. I'll also explore the differences in compiling functional languages (like O'Caml) versus multi-paradigm languages (like Python).
