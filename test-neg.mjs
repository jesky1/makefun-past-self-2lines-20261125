import { test } from "node:test";
import assert from "node:assert/strict";
import { buildEntry, gate } from "./main.ts";

const good = buildEntry();

test("real entry passes the gate", () => {
  assert.doesNotThrow(() => gate(good));
});

test("281 characters is rejected", () => {
  assert.throws(() => gate("x".repeat(140) + ".\n" + "y".repeat(139) + "."), /280/);
});

test("exactly 280 characters is accepted", () => {
  assert.doesNotThrow(() => gate("a".repeat(138) + ".\n" + "b".repeat(139) + "."));
});

test("whitespace-only is rejected", () => {
  assert.throws(() => gate("   \n   "), /whitespace|blank/);
});

test("empty string is rejected", () => {
  assert.throws(() => gate(""), /characters/);
});

test("one line is rejected", () => {
  assert.throws(() => gate("Only one single sentence here."), /2/);
});

test("three lines are rejected", () => {
  assert.throws(() => gate("First line here.\nSecond line here.\nThird line here."), /2/);
});

test("a blank second line is rejected", () => {
  assert.throws(() => gate("First line here.\n   "), /blank/);
});

test("a line without a full stop is rejected", () => {
  assert.throws(() => gate("First line here\nSecond line here."), /full stop/);
});
