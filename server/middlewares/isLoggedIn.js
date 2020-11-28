const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next();
  }
  throw {
    code: 403,
    message: 'Forbidden'
  }
};

module.exports = {
  isLoggedIn
};
