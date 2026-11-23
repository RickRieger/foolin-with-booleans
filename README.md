# Foolin' With Booleans — True/False Logic in JavaScript

[![Tests](https://github.com/RickRieger/foolin-with-booleans/actions/workflows/tests.yml/badge.svg)](https://github.com/RickRieger/foolin-with-booleans/actions/workflows/tests.yml)

A JavaScript exercise from the **Code Immersives** web development bootcamp in New York City (February 2021). Fourteen functions each answer a yes/no question, such as "is this grade failing?" or "is this person a middle-school teacher?", by returning `true` or `false`. [Jest](https://jestjs.io/) tests check each one. This repo is my fork of the assignment. My solution is in [`main.js`](main.js).

**Skills practiced:** booleans, comparison operators (`>`, `>=`, `<`, `===`, `!==`), combining conditions with `&&` (and), `||` (or) and `!` (not), checking a range, and reusing small functions inside bigger ones.

**Built with:** JavaScript (Node.js) and Jest 24. There's no web page; the badge above shows whether the tests currently pass on GitHub.

---

## Contents

- [My solution](#my-solution)
- [How the logic works](#how-the-logic-works)
- [Run the tests](#run-the-tests)
- [How it's verified](#how-its-verified)
- [Cleanup log (November 2026)](#cleanup-log-november-2026)
- [Original assignment (from the instructor)](#original-assignment-from-the-instructor)

---

## My solution

Written on **2021-02-19** (commits *"yay"* and *"update"*). All 14 of the assignment's tests passed. *(Shown as it is after the 2026 cleanup; see the log below for what changed.)*

```js
// Comparing numbers
function moreThan5(num) {
  return num > 5;
}

function isNewTopScore(score, topScore) {
  return score > topScore;
}

// Grade ranges
function isFailing(grade)    { return grade < 60; }
function isInDanger(grade)   { return grade >= 60 && grade < 72; }
function isCoasting(grade)   { return grade >= 72 && grade < 84; }
function isSucceeding(grade) { return grade >= 84 && grade <= 92; }
function isAcing(grade)      { return grade > 92; }

// Comparing strings
function isStudent(role)    { return role === 'student'; }
function isTeacher(role)    { return role === 'teacher'; }
function isAdmin(role)      { return role === 'admin'; }
function isElementary(level) { return level === 'elementary'; }

function areDifferentPeople(name1, name2) {
  return name1 !== name2;
}

// Combining checks (reusing the functions above)
function isMiddleSchoolTeacher(role, level) {
  return isTeacher(role) && level >= 6 && level <= 8;
}

function notAnElementarySchoolAdministrator(level, role) {
  return !(isElementary(level) && isAdmin(role));
}
```

*(In `main.js` each function has the usual multi-line layout; it's condensed here to fit.)*

## How the logic works

**A comparison is already a boolean.** `num > 5` evaluates to `true` or `false` on its own, so you can `return num > 5;` directly. There's no need for `if (num > 5) { return true; } else { return false; }`.

**Ranges use `&&`.** "Between 60 and 72" means "at least 60 **and** below 72": `grade >= 60 && grade < 72`. Both sides must be true.

**Strict equality, `===`.** `role === 'teacher'` is true only for that exact string, so `'teachers are even better'` and `'Teacher'` (capital T) are both `false`. `!==` means "not equal", which is what `areDifferentPeople` uses.

**Combining checks.** `isMiddleSchoolTeacher` is true only when *both* parts hold: the role is teacher **and** the level is 6–8.

**"Not" logic and De Morgan's law.** The trickiest task is `notAnElementarySchoolAdministrator`, which should be false *only* for an elementary-school admin. There are two equivalent ways to write it:

```js
!(isElementary(level) && isAdmin(role))       // "NOT (elementary AND admin)"; the current version
level !== 'elementary' || role !== 'admin'    // "not elementary OR not admin"; my original 2021 version
```

Both give the same answer for every input. This is **De Morgan's law**: *not (A and B)* equals *(not A) or (not B)*. My 2021 version was already correct. The cleanup switched to the first form because it reads like the task description.

| level | role | Is an elementary admin? | Result |
|---|---|---|---|
| `'elementary'` | `'admin'` | yes | `false` |
| `'elementary'` | `'teacher'` | no | `true` |
| `'pre-k'` | `'admin'` | no | `true` |
| `'college'` | `'guidance counselor'` | no | `true` |

## Run the tests

You need [Node.js](https://nodejs.org/).

```bash
git clone https://github.com/RickRieger/foolin-with-booleans.git
cd foolin-with-booleans
npm ci
npm run test:ci   # runs all tests once and exits
npm test          # watch mode, as in the original assignment: re-runs on every save
```

Expected result: `Tests: 16 passed, 16 total` (the 14 original tests plus 2 added in the cleanup below).

## How it's verified

[`.github/workflows/tests.yml`](.github/workflows/tests.yml) runs `npm run test:ci` on GitHub Actions after every push, and the badge at the top shows the result. This repo has no web page, so instead of a live site, a passing test run is how it shows it works.

---

## Cleanup log (November 2026)

All changes below were made on **2026-11-23** on the branch `cleanup-and-ci`, checked by running the tests, and merged into `master`. Each is its own commit. Nothing below the assignment's "internal use only" line in `main.js` was edited, and the original tests are unchanged.

### 1. Closed the gaps between grade ranges

**Why:** the assignment writes the ranges in whole numbers (60–71, 72–83, 84–92), and my code matched them exactly with `<= 71` and `>= 72`. That leaves a gap. A grade of **71.5** was neither "in danger" nor "coasting", and **83.5** fell between "coasting" and "succeeding". Those grades got *no category at all*. Decimal grades are common, so this was a real hole, even though the tests (which only use whole numbers) couldn't see it.

```js
// Before
function isInDanger(grade){
  return grade >= 60 && grade <= 71;    // 71.5 → false
}
function isCoasting(grade){
  return grade >= 72 && grade <= 83;    // 71.5 → false, so 71.5 has no category
}

// After: each upper bound is "below the start of the next range"
function isInDanger(grade) {
  return grade >= 60 && grade < 72;     // 71.5 → true
}
function isCoasting(grade) {
  return grade >= 72 && grade < 84;
}
```

Whole-number grades behave exactly as before. `isSucceeding` keeps `<= 92` because `isAcing` starts at "above 92", so there's no gap there.

I added [`grade-gaps.test.js`](grade-gaps.test.js). It checks 71.5 and 83.5, and that **every grade from 0 to 100, in steps of 0.5, lands in exactly one category**. I confirmed it **fails on the old code** and passes on the fix.

### 2. Tidied `main.js` and reused the simple checks

**Why:**
- Functions were in a jumbled order. They're now grouped under comments (numbers, grade ranges, strings, combined checks), with grades in order from low to high.
- The role functions took a parameter named `string`, which says what *type* it is but not what it *means*. It's now `role` or `level`.
- The two combined checks repeated comparisons that `isTeacher`, `isElementary` and `isAdmin` already do. Reusing them makes the code read like the task.
- Spacing was uneven (`function  areDifferentPeople`, `score,topScore`), with extra blank lines.

No behavior changed (see De Morgan's law above for why the `notAnElementarySchoolAdministrator` rewrite is equivalent).

```js
// Before
function isTeacher(string){
  return string === 'teacher';
}
function isMiddleSchoolTeacher(role, level){
  return role === 'teacher' && level >= 6 && level <= 8;
}
function notAnElementarySchoolAdministrator(level, role){
  return level !== 'elementary' || role !== 'admin';
}

// After
function isTeacher(role) {
  return role === 'teacher';
}
function isMiddleSchoolTeacher(role, level) {
  return isTeacher(role) && level >= 6 && level <= 8;
}
function notAnElementarySchoolAdministrator(level, role) {
  return !(isElementary(level) && isAdmin(role));
}
```

### 3. Automatic test runs on GitHub, and a `.gitignore` fix

**Why:** `npm test` runs Jest in *watch mode*, which never exits, so an automated check couldn't use it. I added a run-once command and a GitHub Actions workflow. `.gitignore` also listed `node_modules` twice.

```jsonc
// Before (package.json)
"scripts": { "test": "jest --watch-all" }

// After
"scripts": {
  "test": "jest --watch-all",   // unchanged: watch mode while working
  "test:ci": "jest --ci"        // new: run once and exit
}
```

### 4. Rewrote this README section

Added everything above. The instructor's original instructions are below, unchanged.

**Left as is:** the role checks are case-sensitive (`'Teacher'` is not `'teacher'`), because the instructions ask for the exact value `"teacher"`.

---

## Original assignment (from the instructor)

*The text below is the assignment README as written by the Code Immersives instructor, unchanged.*

### Foolin' With Booleans

### Workflow

Just your typical fork, clone, and run the tests kind of exercise!


### Tasks

* Write a function called `moreThan5` that takes in a number and returns whether or not it's greater than `5`.
* Write a function called `isNewTopScore` that takes in a score (as a number) and a top score (as a number) and returns whether or not the score is greater than the top score. (This would be a good function in a game or gamified app to see if we need to update the high score to a new one.)
* Write a function called `isInDanger` that takes in a grade (as a number) and returns whether or not it's between `60` and `71`, _inclusive_.
* Write a function called `isCoasting` that takes in a grade (as a number) and returns whether or not it's between `72` and `83`, _inclusive_.
* Write a function called `isSucceeding` that takes in a grade (as a number) and returns whether or not its between `84` and `92`, _inclusive_.
* Write a function called `isFailing` that takes in a grade (as a number) and returns whether or not it's below `60`.
* Write a function called `isAcing` that takes in a grade (as a number) and returns whether or not it's above `92`.
* Write a function called `isStudent` that takes in a role (as a string) and returns if its value is "student".
* Write a function called `isTeacher` that takes in a role (as a string) and returns if its value is "teacher".
* Write a function called `isAdmin` that takes in a role (as a string) and returns if its value is "admin".
* Write a function called `isElementary` that takes in school level (as a string) and returns if its value is "elementary".
* Write a function called `areDifferentPeople` that takes in two names (as strings) and returns whether they're different.
* Write a function called `isMiddleSchoolTeacher` that takes in a role (as a string) and a level (as a _number_) and returns whether they're both a teacher and the level they teach at is `6` to `8` _inclusive_.
* Write a function called `notAnElementarySchoolAdministrator` that takes in a school level (as a string) and a role (as a string) and returns whether they're NOT an elementary school administrator. (An elementary school teacher is not, nor is a middle school administrator. And an expert scuba diver most definitely is not.)
