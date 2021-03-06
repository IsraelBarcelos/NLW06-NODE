import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    
    async execute({ name, email, admin = false, password} : IUserRequest) {

        const usersRepository = getCustomRepository(UsersRepositories)

        if(!email) {
            throw new Error("Email incorrect");
        }

        if(!password) {
            throw new Error("Password is empty!")
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists) {
            throw new Error("user already exists!");
        }

        const user = usersRepository.create({
            name,
            email,
            admin,
            password
        });

        await usersRepository.save(user);
        
        return user;
    }

}

export { CreateUserService }