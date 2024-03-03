const express = require('express')
const mysql = require('mysql');
const app = express()
const path = require('path')
require('dotenv').config();

// Import Middleware
const logger = require('./middleware/logger')
app.use(logger)
const connection = require('./middleware/db_connect');

app.disable("x-powered-by");



// Dashboard
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/app1', (req, res) => {
  res.send('Hello this Apps 1!')
});

app.get('/about', (req, res) => {
  res.send('Wellcome, This is new Project')
});

app.get('/users', (req, res, next) => {
  const sql = "SELECT * FROM tb_data ORDER BY id desc"
  connection.query(sql,(error, fields) => {
      res.send(fields)
  })
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}`)
})

module.exports = app