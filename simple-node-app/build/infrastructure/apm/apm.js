"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_apm_node_1 = __importDefault(require("elastic-apm-node"));
class ApmElastic {
    constructor(nomeServico) {
        this.apm = elastic_apm_node_1.default;
        console.log("APM Constructor", nomeServico);
    }
    getInstance() {
        return this.apm;
    }
    getMiddleware() {
        return this.apm.middleware.connect();
    }
    start() {
        console.log("Starting APM");
        const apmUrl = process.env.APM_URL || 'http://localhost:8200';
        console.log("APM URL", apmUrl);
        this.apm = elastic_apm_node_1.default.start({
            serviceName: 'simple-node-app',
            serverUrl: apmUrl,
            environment: 'docker',
            logLevel: 'trace',
            captureBody: 'all',
        });
        if (this.apm.isStarted())
            console.log("APM Started");
    }
    startTransaction(name, type) {
        return this.apm.startTransaction(name, type);
    }
    startSpan(name, type) {
        return this.apm.startSpan(name, type);
    }
    captureError(error) {
        return this.apm.captureError(error);
    }
    endTransaction(result) {
        return this.apm.endTransaction(result);
    }
    endSpan(span) {
        if (span) {
            span.end();
        }
    }
}
exports.default = ApmElastic;
