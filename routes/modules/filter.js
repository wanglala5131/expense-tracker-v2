const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeLanguage = require('../../changeLanguage')

router.get('/', (req, res) => {
  res.redirect('/')
})

router.post('/', (req, res) => {
  const { currentMonth, currentCategory } = req.body
  //如果有資料就丟到物件裡
  let filter = {}
  if (currentMonth !== 'all') {
    filter.monthNumber = currentMonth
  }
  if (currentCategory !== 'all') {
    filter.category = currentCategory
  }
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => {
      Record.find(filter)
        .lean()
        .then(records => {
          let totalAmount = 0
          for (let i = 0; i < records.length; i++) {
            const iconClass = category.filter(singleCategory => singleCategory.category === records[i].category)
            records[i].category = iconClass[0].category_icon_class
            totalAmount += Number(records[i].amount)
          }

          res.render('index', { records, totalAmount, category, currentCategory, currentMonth })
        })

    })

  // Category.find()
  //   .lean()
  //   .sort({ _id: 'asc' })
  //   .then(category => {
  //     let currentCategory = req.query.category
  //     let currentMonth = req.query.month
  //     if (!currentCategory && !currentMonth) {
  //       Record.find()
  //         .lean()
  //         .sort({ date: 'desc' })
  //         .then(records => {

  //           let totalAmount = 0
  //           for (let i = 0; i < records.length; i++) {
  //             records[i].category = changeLanguage(records[i].category)  //換成icon
  //             totalAmount += Number(records[i].amount)
  //           }

  //           res.render('index', { records, category, currentCategory, totalAmount })
  //         })
  //         .catch(err => console.log(err))
  //     } else {
  //       currentCategory = changeLanguage(currentCategory)
  //       Record.find({ category: currentCategory })
  //         .lean()
  //         .sort({ date: 'desc' })
  //         .then(records => {

  //         let totalAmount = 0
  //         for (let i = 0; i < records.length; i++) {
  //           records[i].category = changeLanguage(records[i].category)  //換成icon
  //           totalAmount += Number(records[i].amount)
  //         }

  //         res.render('index', { records, category, currentCategory, totalAmount })
  //       })
  //       .catch(err => console.log(err))

  //   }
  // })


})

module.exports = router