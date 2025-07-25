import { Redis } from '@upstash/redis';
import config from './config';

const redis = new Redis({ url: config.env.upstash.redisUrl, token: config.env.upstash.redisToken });

(async () => {
  try {
    const data = await redis.get('key');
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();

export default redis;