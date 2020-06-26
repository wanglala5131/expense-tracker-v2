const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/record')
const categories = require('./modules/categories')
const users = require('./modules/users')

router.use('/record', record)
router.use('/categories', categories)
router.use('/users', users)
router.use('/', home)

module.exports = router