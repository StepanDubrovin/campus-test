export interface IUpdateTaskData {
    title: string,
    description?: string,
    status: 'todo' | 'in_progress' | 'done',
}