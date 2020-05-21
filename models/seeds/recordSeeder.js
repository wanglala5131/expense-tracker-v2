const mongoose = require('mongoose')
const Record = require('../record')
const recordList = require('../seeds/record.json').results

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  for (let i = 0; i < recordList.length; i++) {
    Record.create({
      name: recordList[i].name,
      category: recordList[i].category,
      date: recordList[i].date,
      amount: recordList[i].amount,
      modalId: recordList[i].modalId
    })
  }
  console.log('record seeds are created!!')
})