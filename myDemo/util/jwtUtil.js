var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

const jwtSecretKey = 'my test secret key';

createToken = (user) => {
  return jwt.sign({username: user.username }, jwtSecretKey, { expiresIn: '1h' });
};




module.exports = {
  createToken: createToken,
  jwtSecretKey: jwtSecretKey,
  expressJwt:expressJwt.expressjwt({ secret: jwtSecretKey , algorithms: ['HS256'] }),
  UnauthorizedError: expressJwt.UnauthorizedError
};