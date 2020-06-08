const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  merchant: {
    type: String
  },
  date: {
    type: String,
    required: true
  },
  monthNumber: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  remarks: {
    type: String
  },
  modalId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)