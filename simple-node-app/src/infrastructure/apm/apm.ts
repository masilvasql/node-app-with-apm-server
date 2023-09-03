import elasticApm from 'elastic-apm-node'


export default class ApmElastic {

    private apm: elasticApm.Agent = elasticApm

    constructor(nomeServico: string) {
        console.log("APM Constructor", nomeServico)
    }

    public getInstance(): elasticApm.Agent {
        return this.apm
    }

    public getMiddleware() {
        return this.apm.middleware.connect()
    }

    public start():void {
        console.log("Starting APM")
        const apmUrl = process.env.APM_URL || 'http://localhost:8200'
        console.log("APM URL", apmUrl)
        this.apm = elasticApm.start({
            serviceName: 'simple-node-app',
            serverUrl: apmUrl,
            environment: 'docker',
            logLevel: 'trace',
            captureBody: 'all',
        })
        if(this.apm.isStarted()) console.log("APM Started")
    }

    public startTransaction(name: string, type: string) {
        return this.apm.startTransaction(name, type);
    }

    public startSpan(name: string, type: string) {
        return this.apm.startSpan(name, type);
    }

    public captureError(error: Error) {
        return this.apm.captureError(error);
    }

    public endTransaction(result: string) {
         return this.apm.endTransaction(result);
    }

    public endSpan(span: elasticApm.Span):void {
        if(span){
            span.end()
        }
         
    }

 



}