const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const modalNumber = require('../../modalNumber')

router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      Record.find()
        .lean()
        .then(records => {
          //將支出紀錄的類別存成陣列
          let recordList = []
          for (let i = 0; i < records.length; i++) {
            recordList.push(records[i].category)
          }
          //檢查所有categories，如果recordList裡有這個category，就存一個key/value進去categories的object中
          //前端會根據是否有exist這個key，來判定modal要出現什麼訊息
          //仍有支出紀錄 >> 請使用者換掉或刪掉紀錄的類別，只有取消鈕可以按
          //沒有支出紀錄 >> 出現確認訊息，會有刪除按鈕和取消鈕
          for (let i = 0; i < categories.length; i++) {
            let Singlecategory = categories[i].name
            if (recordList.includes(Singlecategory)) {
              categories[i].exist = 'exist'
            }
          }
          res.render('categories', { categories })
        })
        .catch(err => console.log(err))
    })
})
router.get('/create', (req, res) => {
  res.render('categoriesCreate')
})
router.post('/create', (req, res) => {
  let { name, categoryEN, icon } = req.body
  if (!icon) {
    icon = 'far fa-question-circle'
  }
  Category.find()
    .lean()
    .then(categories => {

      //把已有的modalId存成陣列
      let modalNumberList = []
      for (let i = 0; i < categories.length; i++) {
        modalNumberList.push(categories[i].modalId)
      }
      let modalId = 'cate' + modalNumber()

      while (modalNumberList.includes(modalId)) {   //CHECK是否重複
        modalId = 'cate' + modalNumber()
      }
      return Category.create({
        name,
        categoryEN,
        icon,
        modalId
      })
        .then(() => res.redirect('/categories'))
        .catch(err => console.log(err))

    })
})
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  Category.findById(id)
    .lean()
    .then(category => {
      res.render('categoriesEdit', { category })
    })
})
router.put('/:id', (req, res) => {
  const { id } = req.params

  return Category.findById(id)
    .then(category => {
      category = Object.assign(category, req.body)
      return category.save()
    })
    .then(() => res.redirect('/categories'))
    .catch(err => console.log(err))
})
router.delete('/:id', (req, res) => {
  //若支出紀錄還有這個類別，就不能刪掉
  const { id } = req.params
  Category.findById(id)
    .then(category => category.remove())
    .then(res.redirect('/categories'))
    .catch(err => console.log(err))
})
module.exports = router