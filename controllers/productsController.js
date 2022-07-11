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
		const jaTemNoBanco = await db.collection("carrinho").findOne({carrinhoId: carrinho, produtoId: new ObjectId(id)});
		if(!jaTemNoBanco) await db.collection("carrinho").insertOne({
			carrinhoId: carrinho,
			produtoId: produto._id,
			quantidade: 1
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
		res.send(
			await Promise.all(cart.map(async (value) => {
				return {
					carrinho: value,
					produto: await db.collection("produtos").findOne({_id: value.produtoId})
				}
			}))
		);
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function UpdateCarrinho(req, res){
	const {carrinhoId, adiciona} = req.body;
	console.log(carrinhoId, adiciona)
	try {
		const cart = await db.collection("carrinho").findOne({_id: new ObjectId(carrinhoId)});
		console.log(cart)
		if(!adiciona && cart.quantidade === 1){
			await db.collection("carrinho").deleteOne({_id: new ObjectId(carrinhoId)});
		}else{
			await db.collection("carrinho").updateOne({_id: new ObjectId(carrinhoId)}, { $set: {
				quantidade: (adiciona) ? (cart.quantidade+1) : (cart.quantidade-1)
			} });
		}
		res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function DeleteCarrinho(req, res){
	const {carrinho} = req.headers;
	try {
		await db.collection("carrinho").deleteMany({carrinhoId: carrinho});
		res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error);
	}
}