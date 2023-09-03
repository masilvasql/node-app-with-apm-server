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
exports.prisma = void 0;
// import prisma client
const client_1 = require("@prisma/client");
const apm_1 = __importDefault(require("../apm/apm"));
const prisma = new client_1.PrismaClient({
    log: ['error']
});
exports.prisma = prisma;
const apm = new apm_1.default("Prisma");
prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    const span = apm.startSpan(`prisma.${params.model}.${params.action}`, "db");
    if (span) {
        span.type = "DB";
        span.subtype = "prisma";
        span.action = "query";
    }
    try {
        const result = yield next(params);
        span === null || span === void 0 ? void 0 : span.end();
        return result;
    }
    catch (e) {
        span === null || span === void 0 ? void 0 : span.end();
        throw e;
    }
}));
