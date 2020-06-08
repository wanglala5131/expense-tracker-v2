const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const modalNumber = require('../../modalNumber')

router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('categories', { categories })
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
module.exports = router