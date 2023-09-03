import User from "./user.entity";

describe("unit test for user entity", () => {
    it("should create a user", ()=>{
        const user = new User("nome teste", "teste@teste.com", "12345");
        expect(user.getName()).toBe("nome teste")
        expect(user.getEmail()).toBe("teste@teste.com")
        expect(user.getPassword()).toBe("12345")
    })
});