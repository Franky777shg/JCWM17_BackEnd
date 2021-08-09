const router = require('express').Router()

const { userController } = require('../controllers')
const { verifyToken } = require('../helpers/jwt')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/keeplogin', verifyToken, userController.keeplogin)
router.post('/verification', verifyToken, userController.verification)

module.exports = router