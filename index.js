const express = require('express')
const { listUsers, getUser, createUser, updateUser } = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())
const PORT = 4000

//list
app.get('/users', function(req, res) {
  listUsers(req, res)
})

//get
app.get('/users/:id', function(req, res) {
  getUser(req, res)
})

//create
app.post('/users', function(req, res) {
  createUser(req, res)
})

//update
app.put('/users/:id', function(req, res) {
  updateUser(req, res)
})

app.listen(PORT, null, () => console.log('Live on port: ', PORT))
