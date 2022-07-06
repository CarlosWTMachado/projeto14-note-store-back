import db from '../db/db.js';

export async function RetornaProdutos(req, res) {
	try {
		const produtos = await db.collection("produtos").find({}).toArray();
		res.send(produtos);
	} catch (error) {
		return res.status(500).send(error);
	}
}

/*
imagem:
titulo:
preco:
*/