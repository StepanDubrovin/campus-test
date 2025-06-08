import express from 'express'
import 'dotenv/config';
import cookieParser from "cookie-parser"

import UserModel from './models/user.dal';
import UserService from './services/user.service';
import UserController from './controllers/user.controller';
import userRoutes from './routes/user.route';
import TokenService from './services/token.service';

import TaskModel from './models/task.dal';
import TaskService from './services/task.service';
import TaskController from './controllers/task.controller';
import taskRoutes from './routes/task.route';

const app = express();

const port = Number(process.env.PORT);

app.use(cookieParser());
app.use(express.json());

const userService = new UserService(new UserModel(), new TokenService);
const userController = new UserController(userService);

const taskService = new TaskService(new TaskModel());
const taskController = new TaskController(taskService);

app.use('/api', userRoutes(userController))
app.use('/api', taskRoutes(taskController))

app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT localhost:${port}`);
})