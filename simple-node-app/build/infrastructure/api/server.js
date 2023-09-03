"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apm_1 = __importDefault(require("../apm/apm"));
const express_1 = require("./express");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
express_1.app.listen(port, () => {
    const apm = new apm_1.default("server TS");
    apm.start();
    apm.getMiddleware();
    console.log('Server is running on port ', port);
});
