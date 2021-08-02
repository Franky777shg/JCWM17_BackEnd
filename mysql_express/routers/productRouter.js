const router = require('express').Router()

const { productController } = require('../controllers')

router.get('/get-product', productController.getAllProd)
router.get('/get-product/:id', productController.getProductById)
router.post('/add-product', productController.addProduct)
router.delete('/delete-product/:id', productController.deleteProduct)
router.patch('/update-product/:id', productController.updateProduct)
router.get('/sort-name', productController.sortingProduct)

module.exports = router