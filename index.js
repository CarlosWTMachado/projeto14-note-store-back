import express, { json } from 'express';
import cors from 'cors';
//import TransactionRouter from './routes/transactionRouter.js';

const server = express();
server.use(cors());
server.use(json());

//server.use(TransactionRouter);

server.listen(process.env.PORT, () => {
	console.log("Rodando ...");
});