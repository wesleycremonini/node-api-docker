const service = require('../services/products')

/*
 * Retorna todos os produtos da query
 * Se o parâmetro não existir ele é ignorado
 * Se o parametro search existir, todos os outros são ignorados
 */
function getAll(req, res) {
	res.status(200).json(service.getAll(req))
}

module.exports = {
	getAll,
}
