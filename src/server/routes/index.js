const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../../authentication')(passport)
const authRoutes = require('./authentication')

router.use(passport.initialize())
router.use(passport.session())

router.get('/', (req, res) => {
  res.render('home/home')
})

router.use('/', authRoutes(passportConfig))

module.exports = router