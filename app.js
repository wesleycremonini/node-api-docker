require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

//imports
const notFound = require('./middleware/not-found')
const error = require('./middleware/error-handler')
const Sequelize = require('sequelize')
const productsRouter = require('./routes/products')

app.use(express.json())

//home
app.get('/', (req, res) => {
	res.send('Hello')
})

//routes
app.use('/api/v1/products', productsRouter)


app.use(notFound)
app.use(error)



// start app
const PORT = 5000
const HOST = '0.0.0.0'
const start = async () => {
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
		app.listen(PORT, HOST)
		console.log(`Running on http://${HOST}:${PORT}`)
	} catch (error) {
		console.log(error)
	}
}

start()
