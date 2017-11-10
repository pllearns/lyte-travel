const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../../authentication')(passport)
const authRoutes = require('./authentication')
const middlewares = require('../middlewares')
const { renderError } = require('../utils')

router.use(passport.initialize())
router.use(passport.session())

router.get('/', (req, res) => {
  res.render('home/home')
})

router.use('/', authRoutes(passportConfig))

router.use(middlewares.sessionChecker)
router.use(middlewares.logErrors)
router.use(middlewares.notFoundHandler)

module.exports = router