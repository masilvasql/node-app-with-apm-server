import express, {Express} from 'express';
import { userRouter } from './routes/user.routes';
import apmMiddleware from '../../middlewares/apm.middleware';

export const app:Express = express();

app.use(express.json());
// app.use(apmMiddleware)
app.use("/user", userRouter)