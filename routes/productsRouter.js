import express from 'express';
import {RetornaProdutos, AdicionaCarrinho, RetornaCarrinho} from '../controllers/productsController.js';
//import {  } from '../middlewares/productsMiddleware.js';

const router = express.Router();
//router.post('/produtos', );
router.get('/produtos', RetornaProdutos);
router.get('/carrinho', RetornaCarrinho);
router.post('/carrinho', AdicionaCarrinho);
export default router;