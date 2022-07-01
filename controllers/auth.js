const service = require('../services/auth')

// errors
const error = require('../errors/index')

async function login(req, res) {
	const { username, password } = req.body

	if (!username || !password) {
		throw new error.BadRequest('Por favor, informe usuário e senha.')
	}

	res.send(`login`)
}

module.exports = { login }
