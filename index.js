import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import ProductsRouter from './routes/productsRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

const server = express();
server.use(cors());
server.use(json());

server.use(ProductsRouter);
server.use(userRouter);

server.listen(process.env.PORT, () => {
	console.log("Rodando ...");
});
