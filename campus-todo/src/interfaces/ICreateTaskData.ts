export interface ICreateTaskData {
    id: string,
    title: string, 
    description?: string,
    status: 'todo' | 'in_progress' | 'done',
    creatorId: string
}