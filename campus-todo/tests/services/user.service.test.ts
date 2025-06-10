import UserService from "../../src/services/user.service";
import TokenService from "../../src/services/token.service";
import { ApiError } from "../../src/exceptions/api_errors";


const mockUserModel = {
    getByEmail: jest.fn(),
    create: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const tokenService = new TokenService();
const userService = new UserService(mockUserModel as any, tokenService);

describe('UserService.registration()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw ApiError when email already exists', async () => {
        mockUserModel.getByEmail.mockResolvedValue({id: '1', email: 'test@test.com'});

    await expect(userService.registration({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: '12345678',
    })).rejects.toThrow(ApiError);    
    });

    it('should create user and return accessToken for valid data', async () => {
      mockUserModel.getByEmail.mockResolvedValueOnce(null);
      mockUserModel.create.mockResolvedValue(undefined);
      mockUserModel.getByEmail.mockResolvedValueOnce({id: '1', email: 'test@test.com'});

      const result = await userService.registration({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: '12345678'
      });

      expect(result).toHaveProperty('accessToken');
    });

describe('UserService.login()', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should return accessToken when credentials are correct', async () => {
      const hashedPassword = await require('bcrypt').hash('12345678', 10);
      mockUserModel.getByEmail.mockResolvedValue({id: '1', email: 'test@test.com', password: hashedPassword});

      const result = await userService.login({
        email: 'test@test.com',
        password: '12345678',
      });

      expect(result).toHaveProperty('accessToken');
    });
    it('should throw ApiError when password is incorrect', async () => {
      mockUserModel.getByEmail.mockResolvedValue({id: '1', email: 'test@test.com', password: 'wrong'});

      await expect(userService.login({
        email: 'test@test.com',
        password: '12345678',
      })).rejects.toThrow(ApiError);
    });
  });
});


