const Strategy = require('passport-local').Strategy
const users = require('./models/users')

module.exports = passport => {
  passport.use(new Strategy((username, passport, cb) => {
    users.findByUsername(username).then((user) => {
      if (!user) {
        return cb(null, false)
      }
      users.isValidPassword(password, user.password)
        .then(isValid => {
          if (isValid) {
            return cb(null, user)
          }
          return cb(null, false)
        })
    })
    .catch(error => console.error(error))
  }
))

  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  passport.deserializeUser((userId, cb) => {
    user.findById(userId)
    .then((user) => {
      return cb(null, user)
    })
  })
  return passport
}