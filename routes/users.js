const express = require('express')
const router = express.Router();
const passport = require('passport')
const userController= require('../controller/users_controller')

router.get('/profile/:id',passport.checkAuthentication, userController.profile)
router.post('/update/:id',passport.checkAuthentication, userController.update)

router.get('/post',userController.post)


router.get('/sign-in',userController.SignIn);
router.get('/sign-up',userController.SignUp)
//form is posting the data
router.post('/create',userController.create)

//use passport as a middleware to authenticate
// router.post('/createSession',{failureRedirect: '/users/sign-in'}, userController.createSession)
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), userController.createSession)
router.get('/sign-out',userController.destroySession)
module.exports = router;