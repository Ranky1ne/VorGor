// В package.json я сменил type на module для правильного импорта
// Чуть ниже нарисовал тебе импорт здорового человека
// Про require давай забудем пока
const http = require('http')
// import http from "http";


// По поводу линтинга, добавил тебе свой обычный конфиг в .prettierrc
// Посмотри как в вскоде работает https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
// Желательно еще себе добавить eslint. Посмотри роличек какой-нибудь в ютубе потом про него.


const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')

import { connection } from './repository/connection'
import { router } from './router'

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
app.use(express.static(path.join(__dirname, '/static')))
app.use(morgan('dev'))
app.set('port', process.env.PORT || 4300)

//Используем роутер:
app.use('/', router)
//В него я перенес логику некоторых роутов, сделай с остальными по подобию

app.post('/delete', async function (request, response) {
  let dott = request.body.deleteOrder

  connection.query(
    'DELETE FROM `cars` WHERE `cars`.`orderId` = ?',
    [dott],
    async function (err, result, fields) {
      if (err) throw err
    }
  )
  connection.query(
    ' DELETE FROM newForm WHERE `newForm`.`id` = ?',
    [dott],
    async function (err, result, fields) {
      if (err) throw err
    }
  )

  response.redirect('/home')
})

app.post('/deleteCar', async function (request, response) {
  const body = request.body
  let dott = body.deleteCar
  let carId = body.carOrderId

  connection.query(
    'DELETE FROM cars WHERE `id` = ? ',
    [dott],
    async function (err, result, fields) {
      if (err) throw err
    }
  )
  if (carId === 'undefined') {
    response.redirect('/home')
  } else {
    response.redirect(`/carList?carList=${carId}`)
  }
})

app.post('/addCar', async function (request, response) {
  response.statusCode = 200
  const body = request.body
  let carId = body.carId
  let carNumber = body.carNumber
  let carVolume = body.carVolume
  let carCustomer
  let carCarier
  const query = (connection, queryFst, argsFst, queryScd) => {
    return new Promise((resolve, reject) => {
      connection.query(queryFst, argsFst, (err, res) => {
        if (err) reject(err)
        if (err === null) {
          carCustomer = res[0]['Заказчик']
          carCarier = res[0][`Перевозчик`]

          connection.query(
            queryScd,
            [carCustomer, carCarier, carNumber, carVolume, carId],
            (err, res) => {
              if (err) reject(err)
              resolve(res)
            }
          )
        }
      })
    })
  }

  try {
    await query(
      connection,
      'SELECT  `Заказчик`, `Перевозчик` FROM `cars` WHERE `Объем, м3` = 0 AND `orderId` = ?',
      [carId],
      'INSERT INTO cars (`Заказчик`, `Перевозчик`,`Номер машины`, `Объем, м3`, `orderId`) VALUES (?, ?, ?, ?, ?)',
      [carCustomer, carCarier, carNumber, carVolume, carId]
    )
  } catch (error) {
    console.log(error)
  }

  response.redirect(`/carList?carList=${carId}`)
})

app.post('/moveCars', async function (request, response) {
  response.statusCode = 200
  let dott = request.body.carId
  connection.query(
    'UPDATE cars SET `onObject` = 0 WHERE id = ?',
    [dott],
    function (error, results) {
      if (error) throw error
    }
  )
  response.end()
})

app.post('/moveCarsBack', async function (request, response) {
  response.statusCode = 200
  let dott = request.body.carId
  connection.query(
    'UPDATE cars SET `onObject` = 1 WHERE id = ?',
    [dott],
    function (error, results) {
      if (error) throw error
    }
  )
  response.end()
})

app.get('/', function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + '/static/html/login.html'))
})

app.get('/home', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/static/html/home.html'))
  } else {
    // Not logged in
    response.redirect('/')
  }
})

app.get('/admin', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/static/html/admin.html'))
  } else {
    // Not logged in
    response.redirect('/')
  }
})

app.get('/newForm', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/static/html/newForm.html'))
  } else {
    // Not logged in
    response.redirect('/')
  }
})

app.get('/changeForm', async function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/static/html/changeForm.html'))
  } else {
    // Not logged in
    response.redirect('/')
  }
})

app.get('/carList', function (request, response) {
  if (request.session.loggedin) {
    response.statusCode = 200
    response.sendFile(path.join(__dirname + '/static/html/carList.html'))
  } else {
    // Not logged in
    response.redirect('/')
  }
})

app.get('/operator', function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/static/html/operator.html'))
  } else {
    // Not logged in
    response.redirect('/')
  }
})

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

// app.post('/volumeChange', function(request,response){

// })

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
