const repository = require('../repositories/products')
const Product = require('../models/product') //model
const ProductAttributes = Object.keys(Product.getAttributes()) // parametros existentes no model
const { Op } = require('sequelize') // operator

async function getAll(query) {
  for (const field in query) {
    if (!ProductAttributes.includes(field)) {
			delete query[field]
		} else {
      query[field] = { [Op.regexp]: query[field] }
    }
	}

  return await repository.getAll(query)
}

module.exports = { getAll }
