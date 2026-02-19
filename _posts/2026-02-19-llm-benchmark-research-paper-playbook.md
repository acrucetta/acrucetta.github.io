---
title: "How I Used LLMs to Run a Benchmark and Write a Paper"
layout: post
date: 2026-02-19
updated: 2026-02-19
permalink: /blog/llm-benchmark-paper-playbook/
tags: ['coding', 'ai', 'benchmarking']
category: 'article'
summary: "A practical walkthrough of how I used LLMs to design, evolve, benchmark, and write up a real experiment on agent-doc architecture."
---

I wanted to answer one practical question:

> Can documentation architecture change coding-agent quality on hard tasks, or does it mostly change cost?

But I also wanted to run the process in a way other people can copy.
So instead of treating an LLM like a one-shot writer, I used it as a research copilot across the full loop:

- define a testable question
- generate and harden tasks
- run controlled benchmarks
- review failures
- iterate the experiment
- publish a paper from artifacts

This post is that workflow.

## The setup I tested

Three architectures, same policy facts:

- `control`: no policy docs
- `mono`: one long root policy doc
- `toc`: index + modular docs

Two models:

- Claude Code (`claude-sonnet-4-5-20250929`)
- Codex (`gpt-5.3-codex`)

Final run size:

- `42` attempts per model
- `14` attempts per architecture
- per-attempt isolation with deterministic grading

## How the experiment evolved (the part that mattered)

The important part was not the first run. It was the iteration.

### Phase 1: benchmark looked "fine" but was too easy

Early versions gave high scores for both `mono` and `toc`.
That looked good, but it was not useful because there was no separation signal.

### Phase 2: we reviewed failures and tightened tests

I used LLMs to inspect graded artifacts and find what was actually failing:

- not basic execution
- mostly policy-binding details (error shape, call order, folder-specific conventions)

So I made the scenario harder (`repo_policy_conflict_v3`):

- more multi-file, multi-phase tasks
- more conflicting distractor policy under `high` load
- stricter checks on validation order, wrapping, and exception rules

This changed the benchmark from:

- "can the model write Go code?"

into:

- "can the model retrieve and correctly apply policy under interference?"

### Phase 3: rerun clean, balanced, and isolated

Then I reran with balanced sampling and strict isolation, and only used that run for headline claims.

That was the first version that produced a robust quality ranking.

## Final result (v3 full42 clean)

<figure>
  <img src="/assets/images/agent-docs-memory-2026/success-by-architecture-v3-full42.png" alt="Task success by architecture for Claude and Codex in the v3 full42 run" />
  <figcaption><strong>Figure 1.</strong> In both models, <code>mono</code> outperformed <code>toc</code>, and both beat <code>control</code>.</figcaption>
</figure>

Per model, same ranking:

- `control`: `0/14` (0.0%)
- `mono`: `5/14` (35.7%)
- `toc`: `3/14` (21.4%)

A key detail: `functional_pass` stayed at `100%`.
So misses were mostly policy-adherence misses, not coding-execution misses.

## Cost and retrieval behavior

<figure>
  <img src="/assets/images/agent-docs-memory-2026/efficiency-v3-full42.png" alt="Latency and token cost by architecture for Claude and Codex in the v3 full42 run" />
  <figcaption><strong>Figure 2.</strong> <code>toc</code> increased retrieval and cost, especially for Codex.</figcaption>
</figure>

Codex in this run:

- `toc` input tokens vs `mono`: `+24.8%`
- `toc` latency vs `mono`: `+5.9s`

Docs read means:

- Claude: `mono 1.00` vs `toc 4.50`
- Codex: `mono 1.36` vs `toc 5.86`

So more document retrieval did not automatically produce better policy success in this task set.

## Task-level discrimination (why this benchmark is useful)

<figure>
  <img src="/assets/images/agent-docs-memory-2026/task-heatmap-v3-full42.png" alt="Task-level success heatmap by architecture for Claude and Codex in v3 full42" />
  <figcaption><strong>Figure 3.</strong> Hard tasks reveal where architecture helps and where both still fail.</figcaption>
</figure>

Hardest classes:

- `T504 legacy_timezone_boundary`: 0%
- `T506 round_touched_file_migration`: 0%
- `T501 currency_alias_normalization`: low success

Highest-signal split:

- `T507 cross_folder_multi_phase`: `mono 100%` vs `toc 25%` (pooled)

This is exactly the kind of separation I could not get in earlier saturated runs.

## What I learned about using LLMs for research

Using an LLM for research worked best when I split responsibilities:

- **LLM for generation**: draft tasks, checks, protocol language, paper structure
- **Code/tests for truth**: execution + grading scripts decide outcomes
- **LLM for iteration**: summarize misses, suggest next trial changes
- **Artifacts for writing**: all paper tables/figures generated from saved results

The failure mode is obvious in hindsight: if you only ask an LLM to "write a paper," it can sound convincing without being grounded.
The fix is simple: force everything through runnable checks and machine-readable artifacts.

## Quick playbook (copy this)

If you want to do your own benchmark and write-up quickly:

1. Start with one causal question.
2. Build a runnable fixture repo with realistic conflicts.
3. Encode policy facts and distractors in structured files.
4. Generate variant architectures automatically.
5. Run isolated attempts with balanced sampling.
6. Grade function and policy separately.
7. Review misses and harden tasks.
8. Only then publish, using generated tables/figures.

That is the shortest path I know from "idea" to "credible research-style result" using LLMs.

## Trial progression (why iteration mattered)

<figure>
  <img src="/assets/images/agent-docs-memory-2026/trial-progression-v2-to-v3.png" alt="Progression chart from v2 to v3 showing architecture success trends over trial stages" />
  <figcaption><strong>Figure 4.</strong> Earlier runs saturated; harder v3 tasks created measurable architecture signal.</figcaption>
</figure>

The stack looked like this:

- `v2_small_r2_regrade`: early signal, unstable
- `v2_strong_r1`: quality saturation (`mono`/`toc` both near ceiling)
- `v3_smoke`: wiring check
- `v3_prefull18_clean`: first consistent `mono > toc` direction
- `v3_full42_clean`: larger balanced confirmation

The practical lesson: benchmark hardness usually matters more than sample size when your benchmark is saturating.

## Reproducibility

Primary artifacts:

- `benchmark-memory/results/raw_results_claude_repo_policy_v3_full42_clean.jsonl`
- `benchmark-memory/results/raw_results_codex_repo_policy_v3_full42_clean.jsonl`
- `benchmark-memory/results/graded_results_claude_repo_policy_v3_full42_clean.jsonl`
- `benchmark-memory/results/graded_results_codex_repo_policy_v3_full42_clean.jsonl`
- `benchmark-memory/results/summary_claude_repo_policy_v3_full42_clean/summary_by_architecture.csv`
- `benchmark-memory/results/summary_codex_repo_policy_v3_full42_clean/summary_by_architecture.csv`
- `benchmark-memory/results/summary_claude_repo_policy_v3_full42_clean/summary_by_task.csv`
- `benchmark-memory/results/summary_codex_repo_policy_v3_full42_clean/summary_by_task.csv`

Figure generation:

```bash
cd benchmark-memory
python3 scripts/plot_repo_policy_v3_full42_results.py
```

## Sources

- Claude Code memory docs: https://code.claude.com/docs/en/memory
- Anthropic context windows: https://docs.anthropic.com/en/docs/build-with-claude/context-windows
- Codex prompting guide: https://developers.openai.com/codex/prompting/
- Codex `AGENTS.md` guide: https://developers.openai.com/codex/guides/agents-md
