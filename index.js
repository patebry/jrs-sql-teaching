const express = require('express')
const { listUsers } = require('./db')
const app = express()
const PORT = 3000

app.get('/users', function(req, res) {
  listUsers(req, res)
})

app.listen(PORT, null, () => console.log('Live on port: ', PORT))
