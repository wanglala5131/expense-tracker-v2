const Record = require('../record')
const recordList = require('../seeds/record.json').results
const db = require('../../config/mongoose')

db.once('open', async () => {

  //助教提供的async/await精簡語法 
  await Promise.all(
    recordList.map((record) => {
      console.log(record);
      return Record.create(record)
    })
  )
  console.log('record seeds are created!!')
  db.close()      //有這個才可以進行category的seed

  // for (let i = 0; i < recordList.length; i++) {
  //   Record.create({
  //     name: recordList[i].name,
  //     category: recordList[i].category,
  //     date: recordList[i].date,
  //     amount: recordList[i].amount,
  //     modalId: recordList[i].modalId
  //   })
  // }
  // console.log('record seeds are created!!')
})