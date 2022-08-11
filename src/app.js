// В package.json я сменил type на module для правильного импорта
// Чуть ниже нарисовал тебе импорт здорового человека
// Про require давай забудем пока
// const http = require('http')
import http from "http";


// По поводу линтинга, добавил тебе свой обычный конфиг в .prettierrc
// Посмотри как в вскоде работает https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
// Желательно еще себе добавить eslint. Посмотри роличек какой-нибудь в ютубе потом про него.

import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connection } from './repository/connection.js'
import { router } from './router.js'
import { __dirname } from "../dirname.js"; 



const app = express()
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/static')));
app.use(morgan('dev'))
app.set('port', process.env.PORT || 4300)

//Используем роутер:
app.use('/', router)
//В него я перенес логику некоторых роутов, сделай с остальными по подобию


// app.get('/operator', function (request, response) {
//   if (request.session.loggedin) {
//     response.sendFile(path.join(__dirname + '/static/html/operator.html'))
//   } else {
//     // Not logged in
//     response.redirect('/')
//   }
// })

app.get('/printTTN', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/static/html/printTTN.html'))
  } else {
    // Not logged in
    response.redirect('/')
  }
})

app.get('/carsData', function (request, response) {
  response.statusCode = 200
  response.setHeader('Content-Type', 'aplication/json')
  connection.query('SELECT * FROM cars', async function (err, result, fields) {
    if (err) throw err
    let data = JSON.stringify(result)
    response.end(data)
  })
})

app.get('/carListData', function (request, response) {
  response.statusCode = 200

  response.setHeader('Content-Type', 'aplication/json')
  connection.query('SELECT * FROM cars', async function (err, result, fields) {
    if (err) throw err
    let data = JSON.stringify(result)
    response.end(data)
  })
})

app.post('/orderData', function (request, response) {
  response.statusCode = 200
  const body = request.body
  let dott = body.changeOrder
  connection.query(
    'SELECT * FROM newForm WHERE id = ?',
    [dott],
    async function (err, result, fields) {
      if (err) throw err
      let data = JSON.stringify(result)
      response.end(data)
    }
  )
})

app.get('/homeData', function (request, response) {
  response.statusCode = 200
  connection.query('SELECT * FROM newForm', async function (err, result, fields) {
    if (err) throw err
    let data = JSON.stringify(result)
    console.log(result)
    response.end(data)
  })
})


http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
