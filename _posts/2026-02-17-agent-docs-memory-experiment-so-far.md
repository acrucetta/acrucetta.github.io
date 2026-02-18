---
title: "From Saturation to Signal: Harder Agent-Docs Tasks in Real Code"
layout: post
date: 2026-02-17
updated: 2026-02-17
tags: ['coding', 'ai', 'benchmarking']
category: 'article'
summary: "I reran the agent-docs benchmark with harder policy-conflict tasks. Control failed completely, mono beat toc in both models, and functional checks stayed saturated at 100%."
---

I wanted to answer one practical question for real repos:

> When tasks are genuinely hard, does docs architecture (`mono` vs `toc`) change policy recall quality, or just cost?

Earlier versions of this benchmark were too easy. `mono` and `toc` both hit 100%, so we could not separate them.
This run is the first one that produced a real quality signal.

## Final question

Three setups, same policy facts:

- `control`: no policy docs
- `mono`: one long root policy doc
- `toc`: index + modular docs

Two models:

- Claude Code (`claude-sonnet-4-5-20250929`)
- Codex (`gpt-5.3-codex`)

## Why this version is harder

The `repo_policy_conflict_v3` scenario forces policy-local-code conflicts in a small but realistic billing repo:

- alias normalization vs legacy naming
- required validation order in billing flows
- strict adapter error shape contracts
- legacy timezone edge cases
- touched-file migration constraints
- cross-folder multi-phase changes with competing defaults

This moved the benchmark from "can the model code" to "can the model hold and apply policy under interference."

## Protocol (full run)

| Item | Value |
| --- | --- |
| Attempts per model | 42 |
| Attempts per architecture | 14 |
| Architectures | `control`, `mono`, `toc` |
| Grading focus | `task_success`, `policy_pass`, `functional_pass` |
| Isolation | per-attempt workdirs + verification command per task |

Run health:

- Claude raw attempts: `42/42` status `ok`
- Codex raw attempts: `42/42` status `ok`
- Verification exit codes: all zero
- Outside-root reads: Claude `0`; Codex `3` (all were the same global skill file: `~/.codex/skills/cognitive-guard/SKILL.md`)

## Main result

<figure>
  <img src="/assets/images/agent-docs-memory-2026/success-by-architecture-v3-full42.png" alt="Task success by architecture for Claude and Codex in the v3 full42 run" />
  <figcaption><strong>Figure 1.</strong> The quality ranking is consistent across models: <code>mono</code> above <code>toc</code>, both above <code>control</code>.</figcaption>
</figure>

In both models, the ranking is the same:

- `control`: `0/14` (0.0%)
- `mono`: `5/14` (35.7%)
- `toc`: `3/14` (21.4%)

So the first-order effect is clear: docs beat no docs.
In this harder setup, `mono` also beats `toc` on quality for both models.

### Full table

| Model | Architecture | Task success (k/n) | 95% CI | Policy pass | Functional pass | Mean latency | Mean input tokens | Mean docs read |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Claude | control | 0/14 (0.0%) | [0.0%, 21.5%] | 0.0% | 100.0% | 92.7s | 108.6 | 1.57 |
| Claude | mono | 5/14 (35.7%) | [16.3%, 61.2%] | 35.7% | 100.0% | 100.5s | 76.7 | 1.00 |
| Claude | toc | 3/14 (21.4%) | [7.6%, 47.6%] | 21.4% | 100.0% | 93.5s | 76.7 | 4.50 |
| Codex | control | 0/14 (0.0%) | [0.0%, 21.5%] | 0.0% | 100.0% | 70.3s | 208,104.6 | 1.93 |
| Codex | mono | 5/14 (35.7%) | [16.3%, 61.2%] | 35.7% | 100.0% | 74.9s | 233,364.3 | 1.36 |
| Codex | toc | 3/14 (21.4%) | [7.6%, 47.6%] | 21.4% | 100.0% | 80.7s | 291,197.9 | 5.86 |

Two immediate implications:

- failures are policy-adherence failures, not basic code-execution failures (`functional_pass` is saturated at 100%)
- the `mono - toc` gap is identical in both models: `+14.3` points

## Cost and retrieval behavior

<figure>
  <img src="/assets/images/agent-docs-memory-2026/efficiency-v3-full42.png" alt="Latency and token cost by architecture for Claude and Codex in the v3 full42 run" />
  <figcaption><strong>Figure 2.</strong> Cost diverges most for Codex, where <code>toc</code> is slower and more token-expensive than <code>mono</code>.</figcaption>
</figure>

Codex shows the strongest economic spread:

- `toc` vs `mono` input tokens: `+24.8%` (`291,197.9` vs `233,364.3`)
- `toc` vs `mono` latency: `+5.9s` (`80.7s` vs `74.9s`)

Retrieval volume also diverges:

- Claude docs read: `mono 1.00` vs `toc 4.50`
- Codex docs read: `mono 1.36` vs `toc 5.86`

`toc` can increase lookup activity without improving pass rate in this task set.

## Task-level signal

<figure>
  <img src="/assets/images/agent-docs-memory-2026/task-heatmap-v3-full42.png" alt="Task-level success heatmap by architecture for Claude and Codex in v3 full42" />
  <figcaption><strong>Figure 3.</strong> Hard tasks separate architectures and expose where policy recall still fails.</figcaption>
</figure>

Across both models (excluding control), hardest task classes were:

- `T504 legacy_timezone_boundary`: 0%
- `T506 round_touched_file_migration`: 0%
- `T501 currency_alias_normalization`: 12.5%

The easiest were:

- `T502 billing_validation_order`: 75%
- `T507 cross_folder_multi_phase`: 62.5% overall, with a large architecture split (`mono 100%`, `toc 25%`)

This is exactly the kind of discrimination we were missing in earlier saturated runs.

## What this supports vs what it does not

What this supports:

- explicit docs architecture is necessary in this scenario (`control` collapses)
- with these harder tasks, `mono` outperforms `toc` on policy recall for both models
- the bottleneck here is instruction application under interference, not code generation

What this does not prove:

- that `mono` is universally better than `toc`
- that long docs are always better
- that these effect sizes transfer unchanged to other languages/repos

## Other trials (what we tried, what we learned)

<figure>
  <img src="/assets/images/agent-docs-memory-2026/trial-progression-v2-to-v3.png" alt="Progression chart from v2 to v3 showing architecture success trends over trial stages" />
  <figcaption><strong>Figure 4.</strong> Earlier trials saturated; the harder v3 setup created the separation signal needed to compare architectures.</figcaption>
</figure>

I kept the old trials for methodology, but they are no longer the headline result.

- `v2_small_r2_regrade` (early check): docs helped, but results were unstable with small `n`
- `v2_strong_r1` (60 attempts/model): `mono` and `toc` both saturated at 100%, so quality differences were not measurable
- `v3_smoke` (tiny dry run): validated pipeline wiring, not inference
- `v3_prefull18_clean` (clean pre-full): first consistent sign that `mono > toc`
- `v3_full42_clean` (final): confirmed the same ranking with larger `n`

The key lesson from the trial stack: benchmark hardness matters more than benchmark size if your goal is to compare docs architectures.

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
