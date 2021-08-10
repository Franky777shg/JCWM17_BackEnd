const router = require('express').Router()

const { profileController } = require('../controllers')

const { upload } = require('../helpers/multer')
const uploader = upload()

router.post('/upload/:id', uploader, profileController.uploadPhoto)

module.exports = router