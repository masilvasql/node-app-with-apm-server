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
const user_entity_1 = __importDefault(require("../../../../../domain/user/entity/user/user.entity"));
const prisma_db_1 = require("../../../../db/prisma.db");
class UserRepository {
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_db_1.prisma.user.create({
                data: {
                    name: entity.getName(),
                    email: entity.getEmail(),
                    password: entity.getPassword()
                }
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersModel = yield prisma_db_1.prisma.user.findMany();
            const users = usersModel.map((userModel) => {
                let user = new user_entity_1.default(userModel.name, userModel.email, userModel.password);
                user.setPassword(userModel.password);
                return user;
            });
            return users;
        });
    }
}
exports.default = UserRepository;
