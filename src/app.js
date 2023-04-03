import http from "http";
import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
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
app.use(express.static(path.join(__dirname, '/static')))
app.use(morgan('dev'))
app.set('port', process.env.PORT || 3000)
app.use('/', router)



http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
