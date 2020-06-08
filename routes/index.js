const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/record')
const categories = require('./modules/categories')


router.use('/', home)
router.use('/record', record)
router.use('/categories', categories)

module.exports = router