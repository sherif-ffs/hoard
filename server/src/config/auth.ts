module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({ status: 'error', data: 'not authenticated' });
  },
};
