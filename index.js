import express, { request } from 'express'
import mongoose from 'mongoose'
import { registerValidation, loginValidation, postCreateValidation } from './validations/auth.js'
import checkAuth from './utilities/checkAuth.js'

import * as userController from './controllers/userController.js'
import * as postController from './controllers/postController.js'

mongoose.connect('mongodb+srv://admin:admin@mern-test.ado02wn.mongodb.net/blog?retryWrites=true&w=majority') // подключение mongoDB к проету
.then(() => console.log('DB is OK'))
.catch((err) => console.log('DB error ==> ', err))

const app = express()  // Инициализация Express JS

app.use(express.json()) // Позволяет читать JSON для express

app.post('/login', loginValidation, userController.login)
app.post('/register', registerValidation , userController.register)
app.get('/me', checkAuth, userController.getMe)
app.get('/posts', postController.getAll)
app.post('/posts', checkAuth,postCreateValidation,postController.create)

app.listen(7777, (err) => {   // Установка порта сервера, и проверка на ошибки
  if(err) return console.log(err)
  else console.log('Everything is OK')
})