// Model
const { Op } = require('sequelize')
const Product = require('../models/product')
const ProductAttributes = Object.keys(Product.getAttributes()) // parametros existentes no model

/*
 * Retorna todos os produtos (teste)
 */
const getAllProductsStatic = async (req, res) => {
	const products = await Product.findAll({})
	res.status(200).json({ products, quantity: products.length })
}

/*
 * Retorna todos os produtos da query
 * Se o parâmetro não existir ele é ignorado
 */
const getAllProducts = async (req, res) => {
	const search = await Product.findAll({
		where: {
			[Op.or]: [
        {id: req.query.search}
      ],
		},
	})

	Object.keys(req.query).forEach((item) => {
		if (!ProductAttributes.includes(item)) {
			delete req.query[item] // deleta parametro inexistente no model
		}
	})
	const products = await Product.findAll({ where: req.query })
	res.status(200).json({ products, quantity: products.length })
}

module.exports = {
	getAllProductsStatic,
	getAllProducts,
}
