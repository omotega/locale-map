import * as Redis from 'redis';
import dotenv from 'dotenv';
import config from './env';

dotenv.config();

const redisurl = config.redisUrl;

class redisCache {
  redis: any;
  constructor() {
    this.redis = null;
  }

  async connect() {
    try {
      this.redis = await Redis.createClient({
        url: redisurl
      });

      this.redis.connect();

      this.redis.on('connect', () => {
        console.log('Redis connected');
      });

      this.redis.on('error', () => {
        console.log('Redis connection error');
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const Cache = new redisCache();

export default Cache;
