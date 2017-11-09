const db = require('./db')
const bcrypt = require('bcrypt')
const saltRounds = 10

const create = (username, password) => {
  bcrypt.hash(password, saltRounds).then((hash) => {
    return db.query(`
      INSERT INTO 
      users (username, password)
      VALUES
      (lower($1::text), $2::text)
      RETURNING
      *
    `,
  [username, hash])
  .catch(error => {
    console.error({
      message: 'Error occured while executing users.create',
      arguments: arguments
    })
    throw error 
    })
  })
}

const findById = (userId) => {
  return db.any(`
    SELECT * FROM users WHERE id=$1::int
  `,
[userId])
.then(user => user)
.catch(error => {
  console.error({
      message: 'Error occured while executing users.findById',
      arguments: arguments
    })
    throw error
  })
}

const getUsername = (id) => {
  return db.oneOrNone(`
      SELECT username FROM users
      WHERE id=$1
    ;
    `,
    [id])
    .catch(error => {
      console.error({
        message: 'Error occurred while executing users.getUserName',
        arguments: arguments
      });
      throw error
    })
}

const findByUsername = (username) => {
  return db.any(`
    SELECT * FROM users WHERE username=$1
  `,
  [username])
  .catch(error => {
    console.error({
      message: 'Error occurred while executing users.findByUsername',
      arguments: arguments
    })
    throw error
  })
}

const isValidPassword = (userId, password) => {
  return findById(userId)
  .then(user => {
    return bcrypt.compare(password, user.password)
  })
}

const updateUsername = (username, id) => {
  return db.query(`
    UPDATE users
    SET username=$1
    WHERE id=$2
    RETURNING *
  ;`,
[username, id])
.catch(error => {
    console.error({
        message: 'Error occurred while executing users.updateUsername',
        arguments: arguments
      })
    throw error
  })
}

const updateCity = (cityId, id) => {
  return db.query(`
    UPDATE users 
    SET city=$1
    WHERE id=$2
    RETURNING *
  ;`, 
  [cityId, id])
  .catch(error => {
    console.error({
      message: 'Error occurred while executing users.updateCity',
      arguments: arguments
    })
    throw error
  })
}

const updateImage = (image, id) => {
  return db.query(`
  UPDATE users 
  SET image=$1
  WHERE id=$2
  RETURNING *
  `,
[image, id])
.catch(error => {
    console.error({
      message: 'Error occurred while executing users.updateImage',
      arguments: arguments
    })
    throw error
  })
}

const destroy = (userId) => {
  return db.query(`
    DELETE FROM 
    users
    WHERE 
    id=$1::int
  `,
  [userId])
  .catch(error => {
    console.error({
      message: 'Error occurred while executing users.destroy',
      arguments: arguments
    })
    throw error
  })
}

module.exports = {
  create,
  findById,
  getUsername,
  findByUsername,
  isValidPassword,
  updateUsername, 
  updateCity,
  updateImage,
  destroy
}