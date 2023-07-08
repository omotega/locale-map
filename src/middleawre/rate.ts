import rateLimit from 'express-rate-limit';

const Limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
  message: 'Too many requests from this IP, please try again later'
});

export default Limiter;
