import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const EXPECTED =
  "Don't send that 2 a.m. text to Maya from the kitchen table — put the phone down and sleep on it.\n" +
  "That one unsent message kept the friendship alive, and a year later she was the one who called first when the job fell through.";

function runOnce(outDir) {
  execFileSync("node", ["--experimental-strip-types", "main.ts"], {
    cwd: HERE,
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    stdio: "pipe",
  });
  return readFileSync(join(outDir, "entry.txt"), "utf8");
}

test("entry matches the two lines exactly, byte for byte", () => {
  const dir = mkdtempSync(join(tmpdir(), "pastself-"));
  try {
    assert.equal(runOnce(dir), EXPECTED);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("entry passes the gate: 1-280 chars, exactly two lines, no trailing newline", () => {
  const dir = mkdtempSync(join(tmpdir(), "pastself-"));
  try {
    const text = runOnce(dir);
    assert.ok([...text].length >= 1 && [...text].length <= 280);
    assert.equal(text.split("\n").length, 2);
    assert.ok(!text.endsWith("\n"));
    assert.ok(text.trim().length > 0);
    for (const line of text.split("\n")) {
      assert.ok(line.trimEnd().endsWith("."));
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("two runs in different output dirs are identical", () => {
  const a = mkdtempSync(join(tmpdir(), "pastself-a-"));
  const b = mkdtempSync(join(tmpdir(), "pastself-b-"));
  try {
    assert.equal(runOnce(a), runOnce(b));
  } finally {
    rmSync(a, { recursive: true, force: true });
    rmSync(b, { recursive: true, force: true });
  }
});
