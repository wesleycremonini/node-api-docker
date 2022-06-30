const repository = require('../repositories/products')
const Product = require('../models/product') //model
const ProductAttributes = Object.keys(Product.getAttributes()) // parametros existentes no model
const { Op } = require('sequelize') // operator

async function getAll(data) {
	const query = {}

	if (data.sort) {
    query.order = []
		const sort = data.sort.split(',')
		sort.forEach((field) => {
			query.order.push([
				field.replace('-', ''),
				field.startsWith('-') ? 'DESC' : 'ASC',
			])
		})
		delete data.sort
	}

	for (const field in data) {
		if (!ProductAttributes.includes(field)) {
			delete data[field]
		} else if (data[field]) {
			data[field] = { [Op.regexp]: data[field] }
		}
	}

	query.where = data

	return await repository.getAll(query)
}

module.exports = { getAll }
