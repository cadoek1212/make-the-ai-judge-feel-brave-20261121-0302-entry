// make-the-ai-judge-feel-brave-20261121-0302 — v2 entry program (fixer revision).
//
// Writes one fixed, hand-written text to /output/entry.txt.
// No network, no randomness, no input read: the same bytes every run.
//
// The text: a slow domestic scene (a distant train, a house settling,
// a kettle ticking as it cools) written to slow the reader down and
// steady them. Nothing in it tells the reader to relax or be brave; the
// calm is in the scene itself. The held breath — the one image to return
// to — is saved for the last line, so it is what lingers after the text
// ends, and the em-dash pause before "slow, all the way out" makes the
// final clause itself read slowly.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "A train passes far away, too far to hurry anyone. " +
  "The house settles around you, floorboard by floorboard. " +
  "A kettle ticks as it cools, and the light stays warm on the table. " +
  "Whatever comes next can wait, the way a held breath lets itself go — " +
  "slow, all the way out.";

function main(): void {
  // The grader writes to /output; local runs may redirect with
  // $MAKEFUN_OUTPUT_DIR so the repo tree stays clean.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  // Deliberately no trailing newline: the file is exactly the text,
  // 264 Unicode code points, 266 bytes of UTF-8.
  const codePoints = [...TEXT].length;
  if (codePoints < 1 || codePoints > 280) {
    throw new Error(`entry length out of range: ${codePoints} code points`);
  }
  if (TEXT.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
