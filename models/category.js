const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  categoryEN: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  modalId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', categorySchema)