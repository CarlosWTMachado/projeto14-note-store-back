import express from 'express';
import {RetornaProdutos} from '../controllers/productsController.js';
//import {  } from '../middlewares/productsMiddleware.js';

const router = express.Router();
//router.post('/produtos', );
router.get('/produtos', RetornaProdutos);
export default router;