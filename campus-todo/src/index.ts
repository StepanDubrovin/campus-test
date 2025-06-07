import express from 'express'
import 'dotenv/config';
import cookieParser from "cookie-parser"

import UserModel from './models/user.dal';
import UserService from './services/user.service';
import UserController from './controllers/user.controller';
import userRoutes from './routes/user.route';
import TokenService from './services/token.service';


const app = express();

const port = Number(process.env.PORT);

app.use(cookieParser());
app.use(express.json());

const userService = new UserService(new UserModel(), new TokenService);
const userController = new UserController(userService);

app.use('/api', userRoutes(userController))

app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT localhost:${port}`);
})