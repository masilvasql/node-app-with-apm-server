import {Router, Request, Response} from 'express'

import UserRepository from '../../user/repository/prisma/user/user.repository';
import InputCreateUserDto from '../../../usecase/user/create/create.user.dto';
import CreateUserUseCase from '../../../usecase/user/create/create.user.usecase';
import FindAllUserUseCase from '../../../usecase/user/findAll/findAall.user.usecase';
import ApmElastic from '../../apm/apm';

const userRouter = Router();
const apmElastic = new ApmElastic("userRouter")

userRouter.post("/", async(req:Request, res:Response)=>{
    const transaction = apmElastic.startTransaction(`${req.method} ${req.path}`, 'request');
    const span = apmElastic.startSpan(`${req.method} ${req.path}`, 'request');
    const useCase = new CreateUserUseCase(new UserRepository())
    try{
        const userDto:  InputCreateUserDto = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
        await useCase.execute(userDto)
        if(span)apmElastic.endSpan(span)
        if(transaction)apmElastic.endTransaction("success")
        return res.status(201).send().end()
    }catch(err:any){
        const error = apmElastic.captureError(err)
        if(span)apmElastic.endSpan(span)
        if(transaction)apmElastic.endTransaction("fail")
    
        res.status(500).json({error:err.message})
    }
})

userRouter.get("/all", async (req:Request, res:Response)=>{
    const transaction = apmElastic.startTransaction(`${req.method} /user${req.path}`, 'request');
    const useCase = new FindAllUserUseCase(new UserRepository())
    try{
        const users = await useCase.execute()
        if(transaction)apmElastic.endTransaction("success")
        return res.status(200).send(users).end()
    }catch(err:any){
        res.status(500).json({error:err.message})
    }
})

export {userRouter}