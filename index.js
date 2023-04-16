import express, { request } from 'express'

import mongoose from 'mongoose'

import { registerValidation, loginValidation, postCreateValidation } from './validations/auth.js'

import multer from 'multer'

import {postController, userController} from './controllers/index.js'
import {ValidationErrors, checkAuth} from './utilities/index.js'


mongoose.connect('mongodb+srv://admin:admin@mern-test.ado02wn.mongodb.net/blog?retryWrites=true&w=majority') // подключение mongoDB к проету
.then(() => console.log('DB is OK'))
.catch((err) => console.log('DB error ==> ', err))

const app = express()  // Инициализация Express JS

const storage = multer.diskStorage({
  destination: (_, a, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file,cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json()) // Позволяет читать JSON для express
app.use('/uploads', express.static('uploads')) 

app.post('/login', loginValidation, ValidationErrors, userController.login)
app.post('/register', registerValidation, ValidationErrors, userController.register)
app.post('/posts', checkAuth,postCreateValidation, ValidationErrors,postController.create)

app.post('/upload', checkAuth,upload.single('image'), (req,res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get('/posts', postController.getAll)
app.get('/posts/:id', postController.getOne)
app.get('/me', checkAuth, userController.getMe)
app.delete('/posts/:id', checkAuth,postController.remove)
app.patch('/posts/:id', checkAuth,postCreateValidation,postController.update)

app.listen(7777, (err) => {   // Установка порта сервера, и проверка на ошибки
  if(err) return console.log(err)
  else console.log('Everything is OK')
})