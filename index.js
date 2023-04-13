import express from 'express'
import jwt from "jsonwebtoken"
import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://admin:admin@mern-test.ado02wn.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('DB is OK'))
.catch((err) => console.log('DB error ==> ', err))

const app = express()  // Инициализация Express JS

app.use(express.json()) // Позволяет читать JSON для express

app.get('/', (request,respons) => {  // get запрос на главный путь ('/'), который вовзращает hello world
   respons.send('Hello World')
})

app.post('/login', (request, respons) => { // post запрос на логин в JSON
    console.log(request.body) 

  const token = jwt.sign({
    email: request.body.email,
    password: request.body.password
  }, 'secret123') // Секретный ключ - secret123

  respons.json({
    success: true,
    token
  })
})

app.listen(7777, (err) => {   // Установка порта сервера, и проверка на ошибки
  if(err) return console.log(err)
  else console.log('Everything is OK')
})