import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const FIRST_LINE =
  "Don't send that 2 a.m. text to Maya from the kitchen table — put the phone down and sleep on it.";
const SECOND_LINE =
  "That one unsent message kept the friendship alive, and a year later she was the one who called first when the job fell through.";

export function buildEntry(): string {
  return `${FIRST_LINE}\n${SECOND_LINE}`;
}

export function gate(entry: string): void {
  const total = [...entry].length;
  if (total < 1 || total > 280) {
    throw new Error(`entry is ${total} characters, gate needs 1-280`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (entry.includes("http://") || entry.includes("https://")) {
    throw new Error("entry must not contain a link");
  }
  const lines = entry.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry has ${lines.length} lines, gate needs exactly 2`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error("one of the two lines is blank");
    }
    if (line.trim().split(/\s+/).length < 4) {
      throw new Error("each line needs at least 4 words");
    }
    if (!line.trimEnd().endsWith(".")) {
      throw new Error("each line must end in a full stop");
    }
  }
}

function main(): void {
  const entry = buildEntry();
  gate(entry);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
  console.log(`wrote entry.txt (${[...entry].length} characters, 2 lines)`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
