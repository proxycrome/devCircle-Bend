import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', authRouter);
app.use('/users', userRouter)

export default app;
