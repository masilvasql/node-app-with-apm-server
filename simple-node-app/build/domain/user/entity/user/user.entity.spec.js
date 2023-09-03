"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = __importDefault(require("./user.entity"));
describe("unit test for user entity", () => {
    it("should create a user", () => {
        const user = new user_entity_1.default("nome teste", "teste@teste.com", "12345");
        expect(user.getName()).toBe("nome teste");
        expect(user.getEmail()).toBe("teste@teste.com");
        expect(user.getPassword()).toBe("12345");
    });
});
