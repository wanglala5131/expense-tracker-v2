const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const changeIcon = require('./changeIcon')
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

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(record => {

      //在這裡將category改成icon
      for (let i = 0; i < record.length; i++) {
        record[i].category = changeIcon(record[i].category)
      }
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => res.render('index', { record, category }))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})