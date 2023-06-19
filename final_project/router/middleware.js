const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access Token Required');

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.status(200).send('Review deleted succesfully');
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
