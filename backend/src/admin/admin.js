export const adminOnly = (req, res, next) => {
  const role = req.headers['x-role'];

  // GET allowed for all users
  if (req.method === 'GET') {
    return next();
  }

  // Only allow admin users for non-GET requests
  if (role === 'admin') {
    return next();
  }

  return res.status(403).json({
    message: 'Forbidden: admin access required'
  });
};
