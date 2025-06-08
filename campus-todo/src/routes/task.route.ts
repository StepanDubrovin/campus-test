import express from "express";
import TaskController from "../controllers/task.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { body,  ValidationChain } from "express-validator";

 const validateTask :ValidationChain[] = [
  body('title')
    .notEmpty().withMessage('Название задачи обязательно')
    .isLength({ max: 255 }).withMessage('Название задачи не должно превышать 255 символов'),
  
  body('description')
    .optional()
    .isLength({ max: 1000 }).withMessage('Описание задачи не должно превышать 1000 символов'),

  body('status')
    .isIn(["todo", "in_progress", "done"]).withMessage("Недопустимый статус задачи"),
];

export default (taskController: TaskController) => {
    const router = express.Router(); 

    router.use(authenticateJWT);

    router.post(
        '/task',
        validateTask,
        taskController.createTask
    );
    
    router.get('/tasks', taskController.getAllTasks);
    router.get('/task/:task_id', taskController.getTaskById);
    router.put('/task/:task_id', validateTask, taskController.updateTask);
    router.delete('/task/:task_id', taskController.deleteTask);

    return router;
};