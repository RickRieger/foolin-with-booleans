// Extra test added during the 2026 cleanup (not part of the original assignment).
// The grade ranges are written in whole numbers (60-71, 72-83, 84-92), so with
// `<= 71` / `>= 72` a grade like 71.5 fell into NO category. Every grade from 0
// to 100, including decimals, should land in exactly one category.
const { isFailing, isInDanger, isCoasting, isSucceeding, isAcing } = require('./main');

const categories = (grade) =>
  [isFailing, isInDanger, isCoasting, isSucceeding, isAcing].filter((check) => check(grade)).length;

describe('grade categories', () => {
  it('put grades between the whole-number ranges into a category', () => {
    expect(isInDanger(71.5)).toBe(true);
    expect(isCoasting(83.5)).toBe(true);
    expect(isSucceeding(92)).toBe(true);
  });

  it('give every grade from 0 to 100 (in steps of 0.5) exactly one category', () => {
    for (let grade = 0; grade <= 100; grade += 0.5) {
      expect(categories(grade)).toBe(1);
    }
  });
});
