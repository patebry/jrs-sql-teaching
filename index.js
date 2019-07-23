const express = require('express')
const { createConnection } = require('promise-mysql')
const app = express()
const PORT = 3000

app.get('/', function(req, res) {
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
})

app.listen(PORT, null, () => console.log('Live on port: ', PORT))
