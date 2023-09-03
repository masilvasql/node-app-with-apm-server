import { Span } from "elastic-apm-node";
import User from "../../../domain/user/entity/user/user.entity";
import UserRepositoryInterface from "../../../domain/user/repository/user-repository.interface";
import ApmElastic from "../../../infrastructure/apm/apm";

export default class FindAllUserUseCase{

    private userRepository: UserRepositoryInterface
    private apmElastic: ApmElastic = new ApmElastic("FindAllUserUseCase")

    constructor(userRepository: UserRepositoryInterface,  ) {
        this.userRepository = userRepository;
    }
    
    async execute(): Promise<User[]>{
        const span = this.apmElastic.startSpan("FindAllUserUseCase - execute", 'usecase');
        const customers = await this.userRepository.findAll();
        if(span)this.apmElastic.endSpan(span)
        return customers;
    }
}