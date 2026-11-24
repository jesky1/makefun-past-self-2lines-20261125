# Two Lines to Your Past Self

[![make.fun](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca)
[![rank](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/jesky1/makefun-past-self-2lines-20261125/rank.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca)
[![reward](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/jesky1/makefun-past-self-2lines-20261125/reward.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca)

Entry for the [make.fun bounty "Two Lines to Your Past Self"](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca).

## What it does

`main.ts` writes a two-line warning to your past self to `/output/entry.txt`:

> Don't send that 2 a.m. text to Maya from the kitchen table — put the phone down and sleep on it.
> That one unsent message kept the friendship alive, and a year later she was the one who called first when the job fell through.

Line one names one concrete moment (2 a.m., the kitchen table, a text to Maya never sent). Line two traces what changed because of it: the friendship survived, and a year later she was the one who called first when the job fell through.

## Gate

The entry is 224 characters, exactly two lines, one sentence each — inside the 1–280 character gate.

## Run

```sh
node main.ts
```

Set `MAKEFUN_OUTPUT_DIR` to choose where `entry.txt` is written (default `/output`).

## Test

```sh
node --test test.mjs test-neg.mjs
```
