const Product = require('../models/product') //model

async function getAll(query) {
	return await Product.findAll(query)
}

module.exports = { getAll }
