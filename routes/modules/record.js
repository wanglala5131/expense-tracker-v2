const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const changeLanguage = require('../../changeLanguage')
const modalNumber = require('../../modalNumber')

//新增支出
router.get('/create', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => res.render('create', { category }))
    .catch(err => console.log(err))
})
router.post('/create', (req, res) => {
  const { name, category, date, remarks, merchant, amount } = req.body
  Record.find()
    .lean()
    .then(record => {
      //把已有的modalId存成陣列
      let modalNumberList = []
      for (let i = 0; i < record.length; i++) {
        modalNumberList.push(record[i].modalId)
      }
      let modalId = modalNumber()
      while (modalNumberList.includes(modalId)) {   //CHECK是否重複
        modalId = modalNumber()
      }
      return Record.create({
        name,
        category,
        date,
        monthNumber: date.split('-')[1],
        amount,
        remarks,
        merchant,
        modalId
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})
//詳細頁
router.get('/:id/detail', (req, res) => {
  const { id } = req.params
  Record.findById(id)
    .lean()
    .then(record => {
      Category.findOne({ name: record.category })
        .lean()
        .then(category => {
          const icon = category.icon
          res.render('detail', { record, icon })
        })
    })

})
//編輯支出
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  Record.findById(id)
    .lean()
    .then(record => {
      const currentCategory = record.category
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => {
          res.render('edit', { record, category, currentCategory })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})
router.put('/:id', (req, res) => {
  const { id } = req.params
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect(`/record/${id}/detail`))
    .catch(error => console.log(error))
})
//刪除支出
router.delete('/:id', (req, res) => {
  const { id } = req.params
  Record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

//篩選
router.get('/filter', (req, res) => {
  const { currentMonth, currentCategory } = req.query
  console.log(currentCategory)
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
        .sort({ date: 'desc' })
        .then(records => {
          //沒有資料時
          if (!records) {
            return res.render('index', { totalAmount: '0', category, currentCategory, currentMonth })
          }
          let totalAmount = 0
          for (let i = 0; i < records.length; i++) {
            const iconClass = category.filter(singleCategory => singleCategory.name === records[i].category)
            records[i].category = iconClass[0].icon
            totalAmount += Number(records[i].amount)
          }
          res.render('index', { records, totalAmount, category, currentCategory, currentMonth })
        })
    })
})

module.exports = router
