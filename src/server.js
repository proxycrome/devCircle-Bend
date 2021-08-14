import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import likesRouter from './routes/likesRoute.js';
import messageRouter from './routes/messageRouter.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//added versioning to routes
app.use('/api/v1', likesRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/users', userRouter)
app.use('/api/v1', messageRouter)

export default app;
