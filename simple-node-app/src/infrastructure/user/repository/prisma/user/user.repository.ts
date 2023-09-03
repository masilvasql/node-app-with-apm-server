import User from "../../../../../domain/user/entity/user/user.entity";
import UserRepositoryInterface from "../../../../../domain/user/repository/user-repository.interface";
import ApmElastic from "../../../../apm/apm";
import { prisma } from "../../../../db/prisma.db";

export default class UserRepository implements UserRepositoryInterface {



    async create(entity: User): Promise<void> {
        await prisma.user.create({
            data: {
                name: entity.getName(),
                email: entity.getEmail(),
                password: entity.getPassword()
            }
        })
    }
    async findAll(): Promise<User[]> {
       
        const usersModel = await prisma.user.findMany()
        const users = usersModel.map((userModel) => {
            let user = new User(userModel.name, userModel.email, userModel.password)
            user.setPassword(userModel.password)
            return user
        })
        
        
        return users
    }

}