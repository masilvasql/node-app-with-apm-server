"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_db_1 = require("../../../../db/prisma.db");
const user_repository_1 = __importDefault(require("./user.repository"));
const user_entity_1 = __importDefault(require("../../../../../domain/user/entity/user/user.entity"));
describe("user repository test", () => {
    it("should create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_db_1.prisma.user.deleteMany({});
        const user = new user_entity_1.default("nome teste", "teste@teste.com", "12345");
        const repository = new user_repository_1.default();
        yield repository.create(user);
        const userPrisma = yield prisma_db_1.prisma.user.findFirst({
            where: {
                name: "nome teste"
            }
        });
        expect(userPrisma).not.toBeNull();
        expect(userPrisma === null || userPrisma === void 0 ? void 0 : userPrisma.name).toBe("nome teste");
        expect(userPrisma === null || userPrisma === void 0 ? void 0 : userPrisma.email).toBe("teste@teste.com");
        expect(userPrisma === null || userPrisma === void 0 ? void 0 : userPrisma.password).toBe("12345");
        yield prisma_db_1.prisma.user.delete({
            where: {
                id: userPrisma === null || userPrisma === void 0 ? void 0 : userPrisma.id
            }
        });
    }));
    it("should find all users", () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_db_1.prisma.user.deleteMany({});
        const user = new user_entity_1.default("nome teste", "teste@teste.com", "12345");
        const repository = new user_repository_1.default();
        yield repository.create(user);
        expect(user).not.toBeNull();
        const user2 = new user_entity_1.default("nome teste 2", "teste2@teste.com", "12345");
        yield repository.create(user2);
        expect(user2).not.toBeNull();
        const users = yield repository.findAll();
        expect(users).not.toBeNull();
        expect(users.length).toBe(2);
        expect(users[0].getName()).toBe("nome teste");
        expect(users[0].getEmail()).toBe("teste@teste.com");
        expect(users[0].getPassword()).toBe("12345");
        expect(users[1].getName()).toBe("nome teste 2");
        expect(users[1].getEmail()).toBe("teste2@teste.com");
        expect(users[1].getPassword()).toBe("12345");
        yield prisma_db_1.prisma.user.deleteMany({});
        const usersAfterDelete = yield repository.findAll();
        expect(usersAfterDelete.length).toBe(0);
    }));
});
