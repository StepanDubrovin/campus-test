import { v7 as uuidv7 } from 'uuid';
import TaskModel from '../models/task.dal';
import { INewTaskData } from './../interfaces/INewTaskData';
import { IUpdateTaskData } from '../interfaces/IUpdateTaskData';
import { IFilterTasks } from '../interfaces/IFilterTasks';


class TaskService {
    private taskModel: TaskModel;

    constructor(taskModel: TaskModel) {
        this.taskModel = taskModel;
    }

    async createTask(user_id: string, taskData: INewTaskData) {
        return await this.taskModel.create({
            id: uuidv7(), 
            creatorId: user_id , 
            ...taskData
        });
    }

    async getAllTasks(user_id: string, options: IFilterTasks) {
        return await this.taskModel.getAll(user_id, options)
    }

    async getTaskById(user_id: string, task_id: string) {
        return await this.taskModel.getById(task_id, user_id);
    }
    
    async updateTask(user_id: string, task_id: string, updatedData: IUpdateTaskData) {
        return await this.taskModel.update(task_id, updatedData, user_id);
    }

    async deleteTask(task_id: string, user_id: string) {
        return await this.taskModel.delete(task_id, user_id)
    }
}

export default TaskService;