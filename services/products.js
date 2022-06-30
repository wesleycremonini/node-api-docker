const Product = require('../models/product') //model
const ProductAttributes = Object.keys(Product.getAttributes()) // parametros existentes no model
const repository = require('../repositories/products')


function getAll(req) {
  if(req.query.search) {
    return repository.getAllSearch(req)
  }

	Object.keys(req.query).forEach((item) => {
		if (!ProductAttributes.includes(item)) {
			delete req.query[item]
		}
	})

  return repository.getAll(req)
}

module.exports = { getAll }
