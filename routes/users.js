const express = require('express')
const router = express.Router();
const userController= require('../controller/users_controller')

router.get('/profile',userController.profile)

router.get('/post',userController.post)


module.exports = router;