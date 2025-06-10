import TaskService from "../../src/services/task.service";

const mockTaskModel= {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};

const taskService = new TaskService(mockTaskModel as any);


describe('TaskService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new task and return it', async () => {
        mockTaskModel.create.mockResolvedValue({id: '1', title: 'Task'});
        const task = await taskService.createTask('user1', {title: 'Task', description: '', status: 'todo' });
        expect(task).toBeDefined();
        expect(mockTaskModel.create).toHaveBeenCalled();
    });

    it('should return all tasks for a user', async () => {
        mockTaskModel.getAll.mockResolvedValue([{id: '1'}, {id: '2'}]);

        const result = await taskService.getAllTasks('user1', {
            status: 'todo', 
            limit: 10,
            offset: 0
        });

        expect(result?.length).toBe(2);
    });

    it('should update task and return updated task', async () => {
        mockTaskModel.update.mockResolvedValue({id: '1', title: 'Updated'});

        const updated = await taskService.updateTask('user1', '1', {
            title: 'Updated', 
            status: 'done',
            description: ''
        });
        // @ts-ignore
        expect(updated.title).toBe('Updated');
    })
})