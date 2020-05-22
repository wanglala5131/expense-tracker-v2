const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const changeLanguage = require('./changeLanguage')
const modalNumber = require('./modalNumber')
const Record = require('./models/record')
const Category = require('./models/category')
const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    equal: function (v1, v2) { return (v1 === v2) }
  }
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


// //新增支出
// app.get('/record/create', (req, res) => {
//   Category.find()
//     .lean()
//     .sort({ _id: 'asc' })
//     .then(category => res.render('create', { category }))
//     .catch(err => console.log(err))
// })
// app.post('/record/create', (req, res) => {
//   const { name, category, date, amount } = req.body
//   Record.find()
//     .lean()
//     .then(record => {
//       //把已有的modalId存成陣列
//       let modalNumberList = []
//       for (let i = 0; i < record.length; i++) {
//         modalNumberList.push(record[i].modalId)
//       }
//       let modalId = modalNumber()
//       while (modalNumberList.includes(modalId)) {   //CHECK是否重複
//         modalId = modalNumber()
//       }
//       return Record.create({ name, category, date, amount, modalId })
//         .then(() => res.redirect('/'))
//         .catch(err => console.log(err))
//     })
// })

// //編輯支出
// app.get('/record/:id/edit', (req, res) => {
//   const { id } = req.params
//   Record.findById(id)
//     .lean()
//     .then(record => {
//       record.date = record.date.replace(/\//g, '-')  //將斜線改橫槓
//       const currentCategory = record.category
//       Category.find()
//         .lean()
//         .sort({ _id: 'asc' })
//         .then(category => {
//           res.render('edit', { record, category, currentCategory })
//         })
//         .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))
// })
// app.put('/record/:id', (req, res) => {
//   const { id } = req.params
//   return Record.findById(id)
//     .then(record => {
//       record = Object.assign(record, req.body)
//       return record.save()
//     })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// //刪除支出
// app.delete('/record/:id', (req, res) => {
//   const { id } = req.params
//   Record.findById(id)
//     .then(record => record.remove())
//     .then(res.redirect('/'))
//     .catch(err => console.log(err))
// })

//分類
// app.get('/categories/:currentCategory', (req, res) => {
//   let { currentCategory } = (req.params)
//   currentCategory = changeLanguage(currentCategory)
//   Record.find()
//     .lean()
//     .sort({ date: 'desc' })
//     .then(records => {
//       return records.filter(record => record.category === currentCategory)
//     })

//     .then(records => {
//       Category.find()
//         .lean()
//         .sort({ _id: 'asc' })
//         .then(category => {
//           let totalAmount = 0

//           for (let i = 0; i < records.length; i++) {
//             records[i].category = changeLanguage(records[i].category)
//             totalAmount += Number(records[i].amount)
//           }
//           res.render('index', { records, category, currentCategory, totalAmount })
//         })
//     })
//     .catch(err => console.log(err))
// })

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})