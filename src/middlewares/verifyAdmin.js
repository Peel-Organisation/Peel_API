function verifyIsAdmin(req, res, next) {
  console.log(req.userToken);
  if (!req.userToken.isAdmin) {
    console.log('User must be an Admin');
    return res.status(401).send({
      auth: false,
      message: 'you must be Admin',
    });
  }
  next();
}

module.exports = verifyIsAdmin; 