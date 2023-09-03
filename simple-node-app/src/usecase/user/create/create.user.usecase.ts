
import User from "../../../domain/user/entity/user/user.entity";
import UserRepositoryInterface from "../../../domain/user/repository/user-repository.interface";
import InputCreateUserDto from "./create.user.dto";

export default class CreateUserUseCase{
    private userRepository: UserRepositoryInterface

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async execute(input: InputCreateUserDto): Promise<void>{
        const user = new User(input.name, input.email, input.password);
        await this.userRepository.create(user);
    }

}