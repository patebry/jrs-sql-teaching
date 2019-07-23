const { createConnection } = require('promise-mysql')
const { keys } = require('ramda')
const buildQuery = require('./buildQuery')
const getBody = require('./getBody')

const listUsers = (req, res) => {
  let db
  createConnection({ user: 'root', password: 'password', database: 'test' })
    .then(conn => {
      db = conn
      return db.query('SELECT * FROM users')
    })
    .then(result => {
      db.end()
      res.send(result)
    })
    .catch(err => {
      db.end()
      console.log(err)
      res.send({ error: err })
    })
}

const getUser = (req, res) => {
  const userId = req.params.id
  let db
  createConnection({ user: 'root', password: 'password', database: 'test' })
    .then(conn => {
      db = conn
      return db.query('SELECT * FROM users WHERE id = ?', [userId])
    })
    .then(result => {
      db.end()
      res.send(result)
    })
    .catch(err => {
      db.end()
      console.log(err)
      res.send({ error: err })
    })
}

const createUser = (req, res) => {
  let body = req.body
  const requiredFields = ['first_name', 'last_name']
  const allowedFields = [
    'first_name',
    'last_name',
    'phone',
    'email',
    'birthday'
  ]
  try {
    body = getBody(body, allowedFields, requiredFields)
  } catch (err) {
    return res.send({ message: err.message })
  }

  createConnection({ user: 'root', password: 'password', database: 'test' })
    .then(conn => {
      db = conn
      return db.query(buildQuery.insert('users', body))
    })
    .then(result => {
      db.end()
      if (result.affectedRows >= 1) {
        res.send({ message: `User created with id: ${result.insertId}` })
      }
    })
    .catch(err => {
      db.end()
      console.log(err)
      res.send({ error: err })
    })
}

const updateUser = (req, res) => {
  const userId = req.params.id
  let body = req.body
  const requiredFields = []
  const allowedFields = [
    'first_name',
    'last_name',
    'phone',
    'email',
    'birthday'
  ]
  try {
    body = getBody(body, allowedFields, requiredFields)
  } catch (err) {
    return res.send({ message: err.message })
  }
  createConnection({ user: 'root', password: 'password', database: 'test' })
    .then(conn => {
      db = conn
      return db.query(buildQuery.update('users', body, userId))
    })
    .then(result => {
      db.end()
      // if (result.affectedRows >= 1) {
      //   res.send({ message: `User created with id: ${result.insertId}` })
      // }
      res.send({ message: `User updated with id: ${userId}` })
    })
    .catch(err => {
      db.end()
      console.log(err)
      res.send({ error: err })
    })
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser
}
