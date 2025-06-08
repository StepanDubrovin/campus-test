import { Response, NextFunction } from "express";
import TaskService from "../services/task.service";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api_errors";
import { IFilterTasks } from "../interfaces/IFilterTasks";

class TaskController {
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    createTask = async (req: any, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errorMessages),
                );
            }

            const newTask = await this.taskService.createTask(
                req.user.id, 
                req.body
            );

            res.status(201).json(newTask)
        } catch(e) {
            next(e);
        }
    }

    getAllTasks = async (req: any, res: Response, next: NextFunction) => {
        try {
            
            const { status, limit, offset} = req.query;

            const options: IFilterTasks = {
                status: status as any,
                limit: limit ? parseInt(limit as string, 10) : undefined,
                offset: offset ? parseInt(offset as string, 10) : undefined
            };

            const tasks = await this.taskService.getAllTasks(req.user.id, options);

            if (tasks) {
                res.status(200).json(tasks);
            } else {
                return next(
                    ApiError.NotFound(`Информация о задачах не найдена`)
                );
            }

        } catch (e) {
            next(e)
        }
    }

    getTaskById = async (req: any, res: Response, next: NextFunction) => {
        try {
            const task_id = req.params.task_id;
            const user_id = req.user.id;

            const task = await this.taskService.getTaskById(user_id, task_id);

            if (task) {
                res.status(200).json(task);
            } else {
                return next(
                    ApiError.NotFound(`Информация о задаче не найдена`)
                );
            }
        } catch (e) {
            next(e);
        }
    }

    updateTask = async (req: any, res: Response, next: NextFunction) => {
        try {
            const user_id = req.user.id;
            const task_id = req.params.task_id;

            const task = await this.taskService.updateTask(user_id, task_id, req.body);

             if (task) {
                res.status(200).json(task);
            } else {
                return next(
                    ApiError.NotFound(`Информация о задаче не найдена`)
                );
            }
        } catch (e) {
            next(e);
        }
    }

    deleteTask = async (req: any, res: Response, next: NextFunction) => {
        try {
            const user_id = req.user.id;
            const task_id = req.params.task_id;

        await this.taskService.deleteTask(user_id, task_id);

            res.status(200).json('Задача успешно удалена'); 
        } catch (e) {
            next(e);
        }
    }
}

export default TaskController;