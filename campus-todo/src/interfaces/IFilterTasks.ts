export interface IFilterTasks {
    status?: 'todo' | 'in_progress' | 'done',
    limit?: number,
    offset?: number
}