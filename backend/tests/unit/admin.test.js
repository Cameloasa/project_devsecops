import { describe, it, expect, vi } from 'vitest';
import { adminOnly } from '../../src/admin/admin.js';

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn();
  return res;
};

// Middleware function to be tested for admin access
const admin = adminOnly;
describe('admin middleware', () => {
  it('allows GET requests without admin role', () => {
    const req = { method: 'GET', headers: {} };
    const res = mockRes();
    const next = vi.fn();

    admin(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('blocks POST requests without admin role', () => {
    const req = { method: 'POST', headers: {} };
    const res = mockRes();
    const next = vi.fn();

    admin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Forbidden: admin access required'
    });
  });

  it('allows POST requests with admin role', () => {
    const req = {
      method: 'POST',
      headers: { 'x-role': 'admin' }
    };
    const res = mockRes();
    const next = vi.fn();

    admin(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
