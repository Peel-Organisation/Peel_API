const jwt = require("jsonwebtoken");

secretJWT = process.env.JWT_SECRET;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, secretJWT, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.codename = decoded.codename;
    next();
  });
};

module.exports = verifyToken;
