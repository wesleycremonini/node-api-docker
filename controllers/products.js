const service = require('../services/products')

/*
 * Retorna todos os produtos da query
 * Se o parâmetro não existir ele é ignorado
 */
async function getAll(req, res) {
	const products = await service.getAll(req.query)
	res.status(200).json({ count: products.length, products: products })
}

module.exports = {
	getAll,
}
