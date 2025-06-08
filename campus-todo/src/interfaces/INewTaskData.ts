export interface INewTaskData {
    title: string, 
    description?: string,
    status: 'todo' | 'in_progress' | 'done',
}