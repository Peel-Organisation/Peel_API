const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {

  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      auth: false,
      token: null,
      message:"No token provided !"
    })
  }
  jwt.verify(token, process.env.JWT_SECRET, function (error, jwtDecoded) {
    if (error) {
      return res.status(401).send({
        auth: false,
        token: null,
        message:"Unauthorized !"
      })
    }
    req.userToken = jwtDecoded;
    next();
  })
}

module.exports = verifyToken;
