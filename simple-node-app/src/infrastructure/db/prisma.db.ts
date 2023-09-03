// import prisma client
import { PrismaClient } from '@prisma/client';
import ApmElastic from '../apm/apm';

const prisma = new PrismaClient({
    log:['error']
})

const apm = new ApmElastic("Prisma")

prisma.$use(async (params, next) => {
    const span = apm.startSpan(`prisma.${params.model}.${params.action}`, "db");
    if (span) {
      span.type = "DB";
      span.subtype = "prisma";
      span.action = "query";
    }
    try {
      const result = await next(params);
      span?.end();
      return result;
    } catch (e) {
      span?.end();
      throw e;
    }
  });

export {prisma}