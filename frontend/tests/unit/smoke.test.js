import { describe, test, expect } from 'vitest';

describe('Smoke unit tests', () => {
  test('true is true', () => {
    expect(true).toBe(true);
  });

  test('addition works', () => {
    expect(1 + 1).toBe(2);
  });

  test('array has length', () => {
    expect([1, 2, 3]).toHaveLength(3);
  });

  test('object has property', () => {
    const obj = { name: 'test' };
    expect(obj).toHaveProperty('name');
  });

  test('string contains', () => {
    expect('hello world').toContain('world');
  });
});