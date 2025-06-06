import rateLimit from "express-rate-limit";
import { ApiError } from "../exceptions/api_errors";

export const registrationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, _res, next) => {
        next(ApiError.TooManyRequests('Слишком много попыток регистрации. Попробуйте позже.'))
    }
});

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true, 
    legacyHeaders: false,
    handler: (_req, _res, next) => {
        next(ApiError.TooManyRequests('Слишком много попыток входа. Попробуйте снова через 15 минут.'))
    }
})