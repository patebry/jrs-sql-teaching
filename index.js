const express = require('express')
const { listUsers, getUser, createUser } = require('./db')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const PORT = 3000

app.get('/users', function(req, res) {
  listUsers(req, res)
})

app.get('/users/:id', function(req, res) {
  getUser(req, res)
})

app.post('/users', function(req, res) {
  createUser(req, res)
})

app.listen(PORT, null, () => console.log('Live on port: ', PORT))
