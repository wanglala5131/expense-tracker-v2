const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const Record = require('../../models/record')
const Category = require('../../models/category')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('post')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('exist')
        res.render('register', { name, email, password, confirmPassword })
      } else {
        User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
          confirmPassword
        })
        res.redirect('/')
      }
    })
    .catch(err => console.log(err))

})

module.exports = router