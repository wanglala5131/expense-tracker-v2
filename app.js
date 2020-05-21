const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const changeLanguage = require('./changeLanguage')
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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(record => {

      //在這裡將category改成icon
      for (let i = 0; i < record.length; i++) {
        record[i].category = changeLanguage(record[i].category)
      }
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => res.render('index', { record, category }))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

app.get('/record/create', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => res.render('create', { category }))
    .catch(err => console.log(err))
})
app.post('/record/create', (req, res) => {
  const { name, category, date, amount } = req.body

  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})