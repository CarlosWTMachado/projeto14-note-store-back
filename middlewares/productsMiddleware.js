import joi from 'joi';

export async function validaCarrinhoToken(req, res, next) {
	const transacaoSchema = joi.object({
		carrinho: joi.string().required()
	});
	const validation = transacaoSchema.validate({carrinho: req.headers.carrinho});
	if(validation.error ) return res.status(422).send(validation.error.details);
	next();
}

export async function validaProdutoId(req, res, next){
	const transacaoSchema = joi.object({
		id: joi.string().required()
	});
	const validation = transacaoSchema.validate(req.body);
	if(validation.error ) return res.status(422).send(validation.error.details);
	next();
}

export async function validaCarrinhoUpdate(req, res, next){
	const transacaoSchema = joi.object({
		carrinhoId: joi.string().required(),
		adiciona: joi.boolean().required()
	});
	const validation = transacaoSchema.validate(req.body);
	if(validation.error ) return res.status(422).send(validation.error.details);
	next();
}

export async function verificaToken(req, res, next){
	if(!req.headers.authorization) return res.sendStatus(401);
	next();
}