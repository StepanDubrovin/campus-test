import express from 'express';
import UserController from '../controllers/user.controller';
import { body } from 'express-validator';
import { registrationLimiter, loginLimiter } from '../middleware/rateLimiter';
import { authenticateJWT } from '../middleware/auth.middleware';

export default (userController: UserController) => {
    const router = express.Router();

    router.post(
        '/registration',
        registrationLimiter,
        [
            body('email', 'Неккоректный формат почты').isEmail(),
            body('password', 'Пароль должен быть не менее 8 символов').isLength({
                min: 8
            }),
        ],
        userController.registration,
    )
    router.post(
        '/login', 
        loginLimiter,
        userController.login
    );
    router.post('/logout', authenticateJWT, userController.logout);
    router.put('/user/:id', authenticateJWT, userController.updateUser);
    router.delete('/user/:id', authenticateJWT, userController.deleteUser);
    router.get('/users', authenticateJWT, userController.getAllUsers);
    router.get('/user/:id', authenticateJWT, userController.getUserById);
    router.get('/checkAuth',authenticateJWT, userController.checkAuth)
    return router;
}