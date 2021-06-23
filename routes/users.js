const express = require('express')
const router = express.Router();
const userController= require('../controller/users_controller')

router.get('/profile',userController.profile)

router.get('/post',userController.post)


router.get('/sign-in',userController.SignIn);
router.get('/sign-up',userController.SignUp)
//form is posting the data
router.post('/create',userController.create)

module.exports = router;