import rateLimit from 'express-rate-limit';

const windowMs = process.env.RATE_LIMIT_WINDOW_MS || 1000;
const max = process.env.RATE_LIMIT_MAX || 5;
const message = process.env.RATE_LIMIT_MESSAGE || 'Too many requests, please try again later.';

const limiter = rateLimit({
    windowMs,
    max,
    message,
});

export default limiter;
