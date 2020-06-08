const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/record')
const filter = require('./modules/filter')

router.use('/', home)
router.use('/record', record)
router.use('/filter', filter)

module.exports = router