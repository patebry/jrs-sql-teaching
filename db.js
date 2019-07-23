const { createConnection } = require('promise-mysql')
const { keys } = require('ramda')
const buildQuery = require('./buildQuery')

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
  const bodyKeys = keys(body)
  let errorKeys = []
  requiredFields.map(x => {
    if (!bodyKeys.includes(x)) {
      errorKeys.push(x)
    }
  })
  if (errorKeys.length > 0) {
    return res.send({
      error: `required fields (${errorKeys.toString()}) were not sent`
    })
  } else {
    const newBody = body
    body = {}
    allowedFields.map(x => {
      if (newBody.hasOwnProperty(x)) {
        body[x] = newBody[x]
      }
    })
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
    })
}

module.exports = {
  listUsers,
  getUser,
  createUser
}
