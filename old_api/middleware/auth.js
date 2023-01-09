const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'SECURITY_KEY');
    console.log(decodedToken)
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({
        error: new Error('User is not connected!')
      });
    } else {
      console.log("user is connected")
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('User is not connected!')
    });
  }
};