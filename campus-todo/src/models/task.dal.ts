import db from "../db";
import { ApiError } from "../exceptions/api_errors";
import { ICreateTaskData } from "../interfaces/ICreateTaskData";
import { IFilterTasks } from "../interfaces/IFilterTasks";
import { IUpdateTaskData } from "../interfaces/IUpdateTaskData";

class TaskModel {
    async create(taskData: ICreateTaskData) {
        try {
            const query = db('tasks');
            await query.insert(taskData);
        } catch (err) {
            console.error('Error creating task', err);
            throw err;
        }
    }

    async getAll(creatorId: string, options: IFilterTasks) {
        try {
            const query = db('tasks').where('creatorId', creatorId);
            const { status, limit = 10, offset = 0} = options

            return await query
                .select("*")
                .limit(limit)
                .offset(offset)
        } catch (err) {
            console.error('Error fetching all tasks', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            
            ApiError.BadConnectToDB(errorArray)
        }
    }

    async getById(task_id: string, creatorId: string) {
        try {
            const query = db('tasks');
            return await query
                .where({id: task_id, creatorId})
                .first();
        } catch (err) {
            console.error('Error fetching task by id', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async update(task_id: string, updatedData: IUpdateTaskData, creatorId: string) {
        try {
            const query = db('tasks');
            return await query.
                where({id: task_id, creatorId})
                .update({
                    title: updatedData.title,
                    description: updatedData.description,
                    status: updatedData.status
            });
        } catch(err) {
            console.error('Error updating task', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async delete(task_id: string, creatorId: string) {
        try {
            const query = db('tasks');
            await query.where({id: task_id, creatorId}).delete();
        } catch (err) {
            console.error('Error deleting task', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }
}

export default TaskModel;