const db = require('./db/users')

module.exports = {
  create: db.create,
  findById: db.findById,
  getUsername: db.getUsername,
  isValidPassword: db.isValidPassword,
  findByUsername: db.findByUsername,
  updateUsername: db.updateUsername,
  updateCity: db.updateCity,
  updateImage: db.updateImage,
  destroy: db.destroy
}