import { Request, Response, NextFunction } from "express";

import ApmElastic from "../infrastructure/apm/apm"

const apmElastic = new ApmElastic("apmMiddleware")


export default function apmMiddleware(req: Request, res: Response, next: NextFunction) {
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