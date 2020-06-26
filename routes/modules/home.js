const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeLanguage = require('../../changeLanguage')


router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {

      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => {
          let totalAmount = 0
          //在這裡將category改成icon 和 加上所有amonut
          for (let i = 0; i < records.length; i++) {
            const iconClass = category.filter(singleCategory => singleCategory.name === records[i].category)
            records[i].category = iconClass[0].icon
            totalAmount += Number(records[i].amount)
          }

          res.render('index', { records, category, totalAmount })
        })
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
})

module.exports = router