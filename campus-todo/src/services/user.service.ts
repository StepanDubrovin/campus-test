import bcrypt from 'bcrypt';
import { v7 as uuidv7 } from 'uuid';
import { INewUser } from "../interfaces/INewUser";
import UserModel from "../models/user.dal";
import TokenService from "./token.service";
import { ILoginData } from '../interfaces/ILoginData';
import { IUpdateUserData } from '../interfaces/IUpdateUserData';
import { ApiError } from "../exceptions/api_errors";

require('dotenv').config();

class UserService {
    private userModel: UserModel;
    private tokenService: TokenService;
    
    constructor(userModel: UserModel, tokenService: TokenService) {
        this.userModel = userModel;
        this.tokenService = tokenService;
    }

    async registration(userData: INewUser) {
        const existingUser = await this.userModel.getByEmail(userData.email);

        if (existingUser) {
            throw ApiError.BadRequest(`Пользователь с такой почтой - ${userData.email} уже существует`);
        }

        const hashedPassword = await bcrypt.hash(
            userData.password,
            parseInt(process.env.SALT_ROUNDS!)
        );

        const newUserData = {
            id: uuidv7(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: hashedPassword
        };

        await this.userModel.create(newUserData);

        const user = await this.userModel.getByEmail(userData.email);

        const accessToken = this.tokenService.generateToken({
            id: user.id, 
            email: user.email
        })
        return{accessToken}
    }

    async login(userData: ILoginData) {
        const user = await this.userModel.getByEmail(userData.email);

        if (user && (await bcrypt.compare(userData.password, user.password))) {
            const accessToken = this.tokenService.generateToken({
                id: user.id,
                email: user.email
            });
        return { accessToken }
        } else {
            throw ApiError.BadRequest('Неверный пароль или email');
        }
    }

    async getAllUsers() {
        return await this.userModel.getAll();
    }

    async getUserById(id: string) {
        return await this.userModel.getById(id);
    }

    async updateUser (id: string, userData: IUpdateUserData) {
        const existingUser = await this.userModel.getById(id);

        if (!existingUser) {
            throw ApiError.BadRequest(`Пользователь с ID ${id} не найден`);
        }

        return this.userModel.update(id, userData);
    }

    async deleteUser(id: string) {
        return this.userModel.delete(id);
    }
}

export default UserService;