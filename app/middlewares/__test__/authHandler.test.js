const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';

function generateAccessTokenWithUser(user) {
  return jwt.sign(
    {
      data: {
        id: user.id,
        permission_level: user.permission_level,
      },
    },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION },
  );
}

const user = {
  id: 1,
  permission_level: 1,
};

const accessToken = generateAccessTokenWithUser(user);
describe('middlewares: authHandler', () => {
  test('should return an accessToken', () => {
    expect(typeof accessToken).toBe('string');
  });
  test('should be a valid accessToken', () => {
    const validToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    expect(validToken).toBeTruthy();
  });
  test('should decode the access token and match with the information before encoding', () => {
    const decoded = jwt.decode(accessToken);
    expect(decoded.data.permission_level).toBe(user.permission_level);
  });
});
