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
exports.userRouter = void 0;
const express_1 = require("express");
const user_repository_1 = __importDefault(require("../../user/repository/prisma/user/user.repository"));
const create_user_usecase_1 = __importDefault(require("../../../usecase/user/create/create.user.usecase"));
const findAall_user_usecase_1 = __importDefault(require("../../../usecase/user/findAll/findAall.user.usecase"));
const apm_1 = __importDefault(require("../../apm/apm"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const apmElastic = new apm_1.default("userRouter");
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = apmElastic.startTransaction(`${req.method} ${req.path}`, 'request');
    const span = apmElastic.startSpan(`${req.method} ${req.path}`, 'request');
    const useCase = new create_user_usecase_1.default(new user_repository_1.default());
    try {
        const userDto = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        };
        yield useCase.execute(userDto);
        if (span)
            apmElastic.endSpan(span);
        if (transaction)
            apmElastic.endTransaction("success");
        return res.status(201).send().end();
    }
    catch (err) {
        const error = apmElastic.captureError(err);
        if (span)
            apmElastic.endSpan(span);
        if (transaction)
            apmElastic.endTransaction("fail");
        res.status(500).json({ error: err.message });
    }
}));
userRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = apmElastic.startTransaction(`${req.method} /user${req.path}`, 'request');
    const useCase = new findAall_user_usecase_1.default(new user_repository_1.default());
    try {
        const users = yield useCase.execute();
        if (transaction)
            apmElastic.endTransaction("success");
        return res.status(200).send(users).end();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
