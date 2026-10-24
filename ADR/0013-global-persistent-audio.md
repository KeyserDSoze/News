# ADR 0013 — A single persistent player across in-app navigation

- Status: Accepted
- Date: 2026-10-25
- Release: 0.0.8
- Supersedes: the stop-on-desk-switch behaviour in ADR 0011 and stop-on-article-unmount in ADR 0007

## Context

React previously mounted separate Web Speech hooks per article and per desk. Those hooks canceled speech on unmount, locale changes and when sections became hidden. A reader could not continue listening to O while browsing its own headlines or following links. Independently mounted speech engines could also overlap without centralized coordination.

## Decision

1. Mount a single `AudioProvider` above the SPA in `main.tsx`. It owns the one native `speechSynthesis` queue and an active session of metadata: origin, content title, kind (daily briefing, full article or article body), source language, current item and progress.
2. Adapt existing article and briefing hooks to use this context instead of creating separate engines; their local action buttons indicate only whether they refer to the active session. **Leaving a desk, changing UI language, opening a different article or using browser Back does not stop speech**.
3. Every explicit new Listen request cancels any previous queue and starts the new one. Incrementing a run/generation token makes stale callbacks inert. The native utterance is referenced until its own completion to limit mobile garbage collection issues.
4. While an active session exists, show one fixed, keyboard-accessible, theme-aware **now-playing bar at the bottom**. It shows a localized kind label, the current spoken story title, progress within a briefing, controls for Pause/Resume/Stop and a link to the original page. Retain ample bottom padding and smartphone safe-area insets. The bar is removed on stop, completion or unhandled speech failure.
5. The interface controls translate with the selected language, but ongoing text-to-speech remains in the language chosen when started. Starting another narration after changing language uses the new language and replaces the old voice.
6. No network API, tracking, microphone permission, generated audio file or persistent audio history is introduced. **Only internal SPA transitions** guarantee the React provider stays mounted. Full reload, closing the tab or PWA, and background limits of browsers/operating systems may interrupt playback.

## Alternatives

Keeping each section's speech engine mounted would preserve duplicate queues and risk overlap. Remote TTS or audio file generation would require extra storage and infrastructure, and cannot guarantee uninterrupted background audio on every device. A single shared context and the browser's accessible native speech API matches O's fully static architecture.

## Validation

Playwright checks uninterrupted narration when moving between a briefing, article, search and language; confirms replacement cancels a previous queue, advances titles across daily news, and makes stale callbacks inert; and verifies dock pause, resume, stop and disappearance on completion.
