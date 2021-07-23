const router = require('express').Router()

const { productController } = require('../controller')

router.get('/getAllProducts', productController.getAllProducts)
router.post('/add-product', productController.addProduct)
router.delete('/delete-product/:id', productController.deleteProduct)
router.put('/put-product/:id', productController.putProduct)
router.patch('/patch-product/:id', productController.patchProduct)

module.exports = router