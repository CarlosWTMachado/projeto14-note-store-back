import db from '../db/db.js';
import {ObjectId} from 'mongodb';
import {v4 as uuid} from 'uuid';

export async function RetornaProdutos(req, res) {
	const {carrinho} = req.headers;
	try {
		const produtos = await db.collection("produtos").find({}).toArray();
		const token = (carrinho) ? carrinho : uuid();
		res.send({produtos, token});
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function AdicionaCarrinho(req, res){
	const {carrinho} = req.headers;
	const {id} = req.body;
	try {
		const produto = await db.collection("produtos").findOne({_id: new ObjectId(id)});
		await db.collection("carrinho").insertOne({
			carrinhoId: carrinho,
			produtoId: produto._id,
			quatidade: 1
		});
		res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function RetornaCarrinho(req, res){
	const {carrinho} = req.headers;
	try {
		const cart = await db.collection("carrinho").find({carrinhoId: carrinho}).toArray();
		res.send(cart);
	} catch (error) {
		return res.status(500).send(error);
	}
}

/*
_id
titulo
imagem
preco

_id
usuarioId
produtoId
quantidade
*/