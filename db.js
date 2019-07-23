const { createConnection } = require('promise-mysql')

const listUsers = (req, res) => {
  let db
  createConnection({ user: 'root', password: 'password', database: 'test' })
    .then(conn => {
      db = conn
      return db.query('SELECT * FROM users')
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  listUsers
}
