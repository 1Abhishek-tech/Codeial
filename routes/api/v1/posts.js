const express = require('express')
const router = express.Router();
const passport = require('passport')
const postApi = require('../../../controller/api/v1/post_api')

router.get('/',postApi.index)
router.delete('/:id',passport.authenticate('jwt',{session: false}),postApi.destroy)

module.exports = router;