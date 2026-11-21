// make-the-ai-judge-feel-brave-20261121-0302 — v1 entry program.
//
// Writes one fixed, hand-written text to /output/entry.txt.
// No network, no randomness, no input read: the same bytes every run.
//
// The text: a slow domestic scene (a distant train, a house settling,
// a held breath letting itself out) written to slow the reader down and
// steady them. Nothing in it tells the reader to relax or be brave; the
// calm is in the scene itself. One image to return to: the held breath
// letting itself out, and whatever comes next waiting until it arrives.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "A train passes far away, too far to hurry anyone. " +
  "The house settles around you, floorboard by floorboard, " +
  "the way a held breath lets itself out. " +
  "Nothing is asking anything of you now. " +
  "The light stays warm on the table, " +
  "and whatever comes next can wait until it arrives.";

function main(): void {
  // The grader writes to /output; local runs may redirect with
  // $MAKEFUN_OUTPUT_DIR so the repo tree stays clean.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  // Deliberately no trailing newline: the file is exactly the text,
  // 269 Unicode code points, 269 bytes of UTF-8.
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
