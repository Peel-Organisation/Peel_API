function verifyIsAdmin(req, res, next) {
  if (!req.userToken.isAdmin) {
    return res.status('401').send({
      auth: false,
      message: 'You must be Admin',
    });
  }
  next();
}

module.exports = verifyIsAdmin; 