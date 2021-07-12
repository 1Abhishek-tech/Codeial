const express = require('express')
const router = express.Router()

const post_Api = require('../../../controller/api/v2/post_api')

router.get('/',post_Api.index)

module.exports= router;