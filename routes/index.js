const express = require('express')
const router = express.Router();

//Routes ko hamesha controller chaheye taki vo koi page display kar sake

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

const homeController = require('../controller/home_controller')
router.get('/',homeController.home)
router.get('/about',homeController.about)

router.use('/users',require('./users'))
router.use('/posts',require('./posts'))
router.use('/comments',require('./comments'))
router.use('/likes',require('./likes'))

router.use('/api',require('./api'))

console.log(  `Router in routes : ${5+5}`)
module.exports = router;