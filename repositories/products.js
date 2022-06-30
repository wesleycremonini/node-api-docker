const { Op } = require('sequelize') // operator
const Product = require('../models/product') //model

async function getAllSearch(req) {
	return await Product.findAll({
		where: {
			[Op.or]: [
				{ id: { [Op.regexp]: req.query.search } },
				{ name: { [Op.regexp]: req.query.search } },
				{ price: { [Op.regexp]: req.query.search } },
				{ company: { [Op.regexp]: req.query.search } },
				{ createdAt: { [Op.regexp]: req.query.search } },
				{ featured: { [Op.regexp]: req.query.search } },
				{ rating: { [Op.regexp]: req.query.search } },
			],
		},
	})
}

async function getAll(req) {
	return await Product.findAll({ where: req.query })
}


module.exports = { getAllSearch, getAll }
