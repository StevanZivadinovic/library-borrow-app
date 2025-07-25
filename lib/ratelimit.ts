import redis from "@/redis.config";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above

// Create a new ratelimiter, that allows 1 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: redis, //umesto redis objecta koji si custom postavio, mozes i Redis iz "@upstash/redis", to je genericki redis client,
  limiter: Ratelimit.slidingWindow(1, "1000 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export default ratelimit;