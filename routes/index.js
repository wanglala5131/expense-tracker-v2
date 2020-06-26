const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const record = require('./modules/record')
const categories = require('./modules/categories')
const users = require('./modules/users')

router.use('/record', authenticator, record)
router.use('/categories', authenticator, categories)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router