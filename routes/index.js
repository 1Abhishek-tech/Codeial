const express = require('express')
const router = express.Router();
const homeController = require('../controller/home_controller')
router.get('/',homeController.home)
router.get('/about',homeController.about)
router.use('/users',require('./users'))

console.log(  `Router in routes : ${5+5}`)
module.exports = router;