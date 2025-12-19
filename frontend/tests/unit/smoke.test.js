import { describe, test, expect } from 'vitest';

describe('Smoke tests', () => {
  test('true should be true', () => {
    expect(true).toBe(true);
  });

  test('addition works', () => {
    expect(1 + 1).toBe(2);
  });

  test('array length', () => {
    expect([1, 2, 3]).toHaveLength(3);
  });

  test('object properties', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toHaveProperty('name');
    expect(obj).toHaveProperty('value', 42);
  });

  test('string contains', () => {
    expect('hello world').toContain('world');
  });
});