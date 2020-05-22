const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeLanguage = require('../../changeLanguage')

router.get('/:currentCategory', (req, res) => {
  let { currentCategory } = (req.params)
  currentCategory = changeLanguage(currentCategory)
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      return records.filter(record => record.category === currentCategory)
    })

    .then(records => {
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => {
          let totalAmount = 0

          for (let i = 0; i < records.length; i++) {
            records[i].category = changeLanguage(records[i].category)
            totalAmount += Number(records[i].amount)
          }
          res.render('index', { records, category, currentCategory, totalAmount })
        })
    })
    .catch(err => console.log(err))
})

module.exports = router