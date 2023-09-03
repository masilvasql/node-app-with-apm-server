"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apm_1 = __importDefault(require("../infrastructure/apm/apm"));
const apmElastic = new apm_1.default("apmMiddleware");
function apmMiddleware(req, res, next) {
    // const transaction = apmElastic.startTransaction(`${req.method} ${req.path}`, 'request');
    // const span = apmElastic.startSpan(`${req.method} ${req.path}`, 'request');
    // if (span) apmElastic.endSpan(span)
    // if (transaction) apmElastic.endTransaction("success")
    // res.on('close', () => {
    //     const transaction = apmElastic.startTransaction(`${req.method} ${req.path}`, 'request');
    //     const span = apmElastic.startSpan(`${req.method} ${req.path}`, 'request');
    //     if (span) apmElastic.endSpan(span)
    //     if (transaction) apmElastic.endTransaction("success")
    // })
    // next()
}
exports.default = apmMiddleware;
