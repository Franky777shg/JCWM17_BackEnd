const router = require('express').Router()

const { userController } = require('../controller')

router.get('/getAllUsers', userController.getAllUsers)
router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router