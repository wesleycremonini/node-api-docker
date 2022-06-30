const express = require('express')
const router = express.Router()

const { getAll } = require('../controllers/products')

router.route('/').get(getAll)

module.exports = router
