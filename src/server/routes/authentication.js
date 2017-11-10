const express = require('express')
const router = express.Router()
const user = require('../../models/users')

module.exports = passport => {
  router.route('/login')
  .get((req, res) => {
    res.render('auth/login')
  })

  .post(passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login'
  }))

  router.route('/signup')
  .get((req, res) => {
    res.render('auth/signup')
  })

  .post((req, res) => {
    const { username, password } = req.body
      user.create(username, password)
      res.redirect('/login')
  })

  router.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/')
    })
  })

  return router 
}