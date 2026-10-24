# ADR 0011 — Minimal desk labels and narrated daily press review

- Status: Accepted
- Date: 2026-10-25
- Release: 0.0.6

## Context
The 10/5/5/5 counters in the four desk tabs and the prominent edition count repeat information without improving navigation. Today's edition also described in text that it contained ten or five stories, distracting from the actual news. Readers want to hear the day's complete sequence of headlines as a press review, without opening ten separate pages.

## Decisions
1. Keep only each desk's name and existing modest 01–04 ordinal in the main navigation. Remove story counts and the decorative oversized number in the edition heading; retain the meaningful date.
2. Keep the main heading «La rassegna del giorno / The daily briefing», but omit the repeating `sectionDescriptions` copy. Preserve editorial notes on historical editions.
3. Add one compact **Ascolta la rassegna / Listen to briefing** control to the first edition of each desk. The control reads every published story by `rank`, using the **title, dek and summary**; it is clearly a spoken press digest, not complete individual long-form articles. Readers retain the full-article speech option on each story page.
4. Use the existing platform Web Speech API, with an appropriate `it-IT` or `en-GB` device voice. Chunk sentences/words to avoid long-utterance limitations and retain references until `onend` completes. Read the stories sequentially, not in parallel.
5. Show an ordinal progress label *only during speech*, plus accessible Pause/Resume/Stop controls. Stop when changing desk, changing language or unmounting. Mounted but hidden archive pages must never keep narrating.
6. Do not store audio, track listeners, add a backend, or request microphone permissions. Installability and native speech limitations remain browser-specific.

## Alternatives
Generating and hosting audio files would add cost and publication complexity; reading full 10-article texts sequentially would be excessively long for a concise daily press review. The user can still listen to the entire article if desired.

## Verification
Playwright mocks platform speech events to verify that every title in each 10- or 5-item edition is spoken in rank order, audio language follows the selected locale, pause/resume/stop works, and switching desks cancels the previous queue. Navigation and edition headings are checked for the removed redundant counters and blurbs.
