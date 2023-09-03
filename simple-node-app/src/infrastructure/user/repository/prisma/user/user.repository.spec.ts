import { PrismaClient } from "@prisma/client"
import { prisma } from "../../../../db/prisma.db"
import UserRepository from "./user.repository"
import User from "../../../../../domain/user/entity/user/user.entity"

describe("user repository test", () => {
    it("should create a user", async () => {

        await prisma.user.deleteMany({})

        const user = new User("nome teste", "teste@teste.com", "12345");
        const repository = new UserRepository()
        await repository.create(user)
        const userPrisma = await prisma.user.findFirst({
            where: {
                name: "nome teste"
            }
        })

        expect(userPrisma).not.toBeNull()
        expect(userPrisma?.name).toBe("nome teste")
        expect(userPrisma?.email).toBe("teste@teste.com")
        expect(userPrisma?.password).toBe("12345")

        await prisma.user.delete({
            where: {
                id: userPrisma?.id
            }
        })

    })

    it("should find all users", async () => {

        await prisma.user.deleteMany({})

        const user = new User("nome teste", "teste@teste.com", "12345");
        const repository = new UserRepository()
        await repository.create(user)
        expect(user).not.toBeNull()

        const user2 = new User("nome teste 2", "teste2@teste.com", "12345");
        await repository.create(user2)
        expect(user2).not.toBeNull()

        const users = await repository.findAll()

        expect(users).not.toBeNull()
        expect(users.length).toBe(2)
        expect(users[0].getName()).toBe("nome teste")
        expect(users[0].getEmail()).toBe("teste@teste.com")
        expect(users[0].getPassword()).toBe("12345")
        expect(users[1].getName()).toBe("nome teste 2")
        expect(users[1].getEmail()).toBe("teste2@teste.com")
        expect(users[1].getPassword()).toBe("12345")

        await prisma.user.deleteMany({
        })

        const usersAfterDelete = await repository.findAll()

        expect(usersAfterDelete.length).toBe(0)

        

        
    })
})