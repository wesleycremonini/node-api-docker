const jwt = require('jsonwebtoken')
const service = require('../services/auth')

// errors
const error = require('../errors/index')

async function login(req, res) {
	const { username, password } = req.body

	if (!username || !password) {
		throw new error.BadRequest('Por favor, informe usuário e senha.')
	}

	// O ID TEM Q SER DA DB
	const id = new Date().getDate()

	const token = jwt.sign(
		{
			id,
			username,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '30d' }
	)

	res.status(200).json({ msg: 'Usuário logado', token })
}

module.exports = { login }
