const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeLanguage = require('../../changeLanguage')


router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0

      //在這裡將category改成icon 和 加上所有amonut
      for (let i = 0; i < records.length; i++) {
        records[i].category = changeLanguage(records[i].category)
        totalAmount += Number(records[i].amount)
      }
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => res.render('index', { records, category, totalAmount }))
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
})

module.exports = router