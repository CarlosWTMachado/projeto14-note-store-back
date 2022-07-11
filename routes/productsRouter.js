import express from 'express';
import {RetornaProdutos, AdicionaCarrinho, RetornaCarrinho, UpdateCarrinho} from '../controllers/productsController.js';
import {validaCarrinhoToken, validaProdutoId, validaCarrinhoUpdate} from '../middlewares/productsMiddleware.js';

const router = express.Router();
//router.post('/produtos', );
router.get('/produtos', validaCarrinhoToken, RetornaProdutos);
router.get('/carrinho', validaCarrinhoToken, RetornaCarrinho);
router.post('/carrinho', validaCarrinhoToken, validaProdutoId, AdicionaCarrinho);
router.post('/updatecarrinho', validaCarrinhoUpdate, UpdateCarrinho);
export default router;