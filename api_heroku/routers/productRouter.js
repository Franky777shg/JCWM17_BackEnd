const router = require('express').Router()

const { productController } = require('../controllers')

router.get('/all-products', productController.getAllProducts)

module.exports = router