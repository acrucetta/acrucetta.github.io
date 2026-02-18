---
title: "macOS local dictation MVP spec"
layout: post
date: 2026-02-16
category: "note"
tags: ["mvp", "speech-to-text", "macos"]
---

## 1. Problem

Build a local-only macOS dictation tool:

- Press global shortcut.
- Speak.
- Release shortcut.
- Insert transcript into the currently focused text box.

No cloud dependency in the runtime path.

## 2. Scope and non-goals

In scope:

- Push-to-talk global shortcut.
- On-device speech-to-text using Moonshine.
- Cross-app text insertion.
- Minimal cleanup (spacing, capitalization, punctuation).
- Basic status UI (menu bar + tiny state indicator).

Non-goals (MVP):

- Rewriting/paraphrasing with LLM.
- Account system, sync, analytics, remote API.
- Advanced NLP features (intent, diarization, commands beyond basic).
- iOS, Windows, Linux support.

## 3. Design principles (Ousterhout style)

- Deep modules, shallow interfaces.
- Each module owns one hard problem.
- Hide complexity behind stable contracts.
- Keep orchestration dumb and explicit.
- Prefer specific code paths over premature generalization.
- One fallback path per boundary, not many.

## 4. Constraints

- Runtime: offline.
- Latency target: final insert <= 900 ms after key release on Apple Silicon baseline.
- Reliability target: >= 95% successful insertions on common apps (Notes, Slack, browser textareas, VS Code).
- Privacy target: do not persist raw audio by default.

## 5. Module boundaries

| Module | Responsibility | Inputs | Outputs | Owns |
|---|---|---|---|---|
| `HotkeyController` | Detect global push-to-talk press/release | Keyboard events | `ShortcutPressed`, `ShortcutReleased` | Key listener lifecycle |
| `PermissionManager` | Check/request mic, accessibility, input-monitoring permissions | OS APIs | Permission state | Permission gating logic |
| `AudioCapture` | Stream PCM frames from microphone | Session start/stop | `AudioFrame` stream | AVAudioEngine setup, format, buffering |
| `ASREngine` | Convert audio frames to partial/final transcript | `AudioFrame` | `PartialTranscript`, `FinalTranscript` | Moonshine model lifecycle |
| `TextPostProcessor` | Deterministic cleanup | Final transcript string | Cleaned transcript string | Rules for spacing/case/punctuation |
| `FocusedFieldWriter` | Insert final text into focused input | Cleaned transcript | `InsertSuccess` or `InsertFailure` | AX write + clipboard fallback |
| `SessionOrchestrator` | Finite-state workflow across modules | Events from all modules | Commands to all modules | Session state machine only |
| `StatusUI` | User feedback and controls | State updates | Visual state | Menu bar + small HUD |

Rule: modules communicate through typed events/contracts, not direct cross-calls except via `SessionOrchestrator`.

## 6. Contracts (minimal)

Event types:

- `ShortcutPressed(timestamp)`
- `ShortcutReleased(timestamp)`
- `AudioFrame(samples, sampleRate, channels)`
- `PartialTranscript(text, confidence?)`
- `FinalTranscript(text, confidence?)`
- `InsertResult(success, method, error?)`

Insertion methods:

- `accessibility_direct` (primary)
- `clipboard_paste` (fallback)

Failure codes:

- `permission_denied`
- `no_focused_field`
- `secure_input_blocked`
- `engine_error`
- `insertion_failed`

## 7. State machine

States:

1. `Idle`
2. `Listening`
3. `Finalizing`
4. `Inserting`
5. `Error`

Transitions:

1. `Idle -> Listening` on `ShortcutPressed` and permissions OK.
2. `Listening -> Finalizing` on `ShortcutReleased`.
3. `Finalizing -> Inserting` on `FinalTranscript`.
4. `Inserting -> Idle` on `InsertSuccess`.
5. `Inserting -> Error` on `InsertFailure`.
6. `Error -> Idle` after toast/log + reset.

## 8. Runtime flow

1. User presses shortcut.
2. `SessionOrchestrator` starts `AudioCapture` + `ASREngine`.
3. Partial transcripts may update HUD.
4. User releases shortcut.
5. `ASREngine` flushes final transcript.
6. `TextPostProcessor` cleans transcript.
7. `FocusedFieldWriter` inserts into focused field.
8. UI returns to idle.

## 9. Text insertion strategy

Primary path (`AX`):

- Get focused UI element.
- Validate editable role.
- Insert at caret or replace selection.

Fallback path (clipboard):

- Save current clipboard.
- Put transcript in clipboard.
- Send `Cmd+V` to active app.
- Restore original clipboard.

Policy:

- Use exactly one fallback (clipboard) to keep behavior predictable.

## 10. Local storage

Persist only:

- Settings: shortcut, preferred model size, UI toggles.
- Optional user dictionary (names/terms).
- Local logs (rotated, text-only, no raw audio).

Do not persist:

- Raw microphone audio (default off).

## 11. Suggested project layout

```text
DictationApp/
  App/
    AppDelegate.swift
    MenuBarController.swift
  Core/
    SessionOrchestrator.swift
    Events.swift
    StateMachine.swift
  Modules/
    Hotkey/
    Permissions/
    Audio/
    ASR/
    PostProcess/
    Insertion/
    StatusUI/
  Infra/
    SettingsStore.swift
    Logger.swift
  Tests/
    StateMachineTests.swift
    PostProcessorTests.swift
    InsertionFallbackTests.swift
```

## 12. Acceptance criteria

1. Holding shortcut starts recording within 100 ms.
2. Releasing shortcut inserts transcript into focused text field in <= 900 ms median.
3. If AX insertion fails, clipboard fallback inserts in <= 1200 ms median.
4. Missing permissions are surfaced with actionable prompt and no crash.
5. App remains responsive after 100 continuous dictation sessions.

## 13. Verification plan

Unit tests:

- State transitions.
- Text cleanup rules.
- Error-code mapping.

Manual smoke checks:

1. Notes app: new line insert.
2. Slack message box: multi-sentence insert.
3. Browser textarea: insert + punctuation cleanup.
4. VS Code editor: insert at cursor.
5. Secure field: verify safe failure behavior.

Performance checks:

- Log `release_to_final_ms`.
- Log `release_to_insert_ms`.
- Track p50/p95 locally.

## 14. Phase plan

Phase 1:

- Menu bar app, permissions, hotkey, status UI skeleton.

Phase 2:

- Audio capture + Moonshine ASR + partial/final transcript path.

Phase 3:

- Focused field insertion with AX primary and clipboard fallback.

Phase 4:

- Cleanup rules, settings persistence, latency logging, hardening.

## 15. Out-of-scope extension path

After MVP is stable:

- Add spoken commands (`new line`, `delete last sentence`).
- Add personal dictionary ranking.
- Add optional cloud rewrite mode (explicit opt-in).
