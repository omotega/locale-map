import dotenv from 'dotenv';
dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  MONG0_URI: process.env.MONGO_URI as string,
  PORT: process.env.PORT,
  accessTokenValidity: parseInt(process.env.ACCESSTOKENVALIDITY || '0'),
  refreshTokenValidity: parseInt(process.env.REFRESHTOKENVALIDITY || '0'),
  issuer: process.env.ISSUER as string,
  audience: process.env.AUDIENCE as string,
  cert: process.env.JWTSECRET as string,
  redisUsername: process.env.REDIS_USERNAME,
  redisPort: process.env.REDIS_PORT,
  redisHost: process.env.REDIS_HOST,
  redisPassword: process.env.REDIS_PASSWORD,
  redisUrl: process.env.REDIS_URL
};

export default config;
