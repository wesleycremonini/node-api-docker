const repository = require('../repositories/products')
const Product = require('../models/product') //model
const ProductAttributes = Object.keys(Product.getAttributes()) // parametros existentes no model
const { Op } = require('sequelize') // operator

// errors
const error = require('../errors/index')

async function getAll(data) {
	try {
		const query = {}

		if (data.limit) {
			query.limit = Number(data.limit)
			if (data.page && data.page > 1) {
				query.offset = query.limit * (data.page - 1)
			}
		}

		if (data.sort) {
			query.order = []
			const sort = data.sort.split(',')
			sort.forEach((field) => {
				query.order.push([
					field.replace('-', ''),
					field.startsWith('-') ? 'DESC' : 'ASC',
				])
			})
		}

		if (data.select) query.attributes = data.select.split(',')

		if (data.price) {
			data.price = { [Op.between]: data.price.split(',') }
		}

		if (data.rating) {
			data.rating = { [Op.between]: data.rating.split(',') }
		}

		if (data.createdAt) {
			data.createdAt = { [Op.gte]: data.createdAt }
		}

		if (data.name) {
			data.name = { [Op.regexp]: data.name }
		}

		if (data.company) {
			data.company = { [Op.regexp]: data.company }
		}

		for (const field in data) {
			if (!ProductAttributes.includes(field)) {
				delete data[field]
			}
		}

		query.where = await data

		return await repository.getAll(query)
	} catch (err) {
    throw new error.BadRequest('Há algo de errado com a sua requisição. Documentação: localhost/docs')
  }
}

module.exports = { getAll }
