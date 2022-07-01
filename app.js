require('dotenv').config()
require('express-async-errors')
const Sequelize = require('sequelize')

const express = require('express')
const app = express()

//imports
const notFound = require('./middleware/not-found')
const error = require('./middleware/error-handler')

//router
const authRouter = require('./routes/auth')
const productsRouter = require('./routes/products')

//middleware
app.use(express.json())

//auth
app.use('/api/v1/auth', authRouter)

// products
app.use('/api/v1/products', productsRouter)

app.use(notFound)
app.use(error)


async function start() {
	try {
		const connectDB = await new Sequelize(
			process.env.MYSQLDB_DATABASE,
			process.env.MYSQLDB_USER,
			process.env.MYSQLDB_ROOT_PASSWORD,
			{
				dialect: 'mysql',
				host: 'db',
				port: '3306',
			}
		)
		connectDB.authenticate()
		app.listen(5000, '0.0.0.0')
		console.log(`Running...`)
	} catch (error) {
		console.log(error)
	}
}

start()
