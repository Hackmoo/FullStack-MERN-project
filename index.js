import express from 'express'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'

import { registerValidation } from './validations/auth.js'

import userModel from './models/User.js'

mongoose.connect('mongodb+srv://admin:admin@mern-test.ado02wn.mongodb.net/blog?retryWrites=true&w=majority') // подключение mongoDB к проету
.then(() => console.log('DB is OK'))
.catch((err) => console.log('DB error ==> ', err))

const app = express()  // Инициализация Express JS

app.use(express.json()) // Позволяет читать JSON для express

app.post('/login',async (request, respons) => {
  try{
    const user = await userModel.findOne({ email: request.body.email })

    if(!user){
      return respons.status(404).json({
        message: 'User is not found'
      })
    }

    const isValidPass = await bcrypt.compare(request.body.password, user._doc.passwordHash)

    if(!isValidPass) {
      return respons.status(404).json({
        message: "invalid login or password"
      })
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      'secret123',
      {
        expiresIn: '30d'
      }
    )

    const {passwordHash, ...userData} = user._doc

  respons.json({
    ...userData,
    token
  })

  } catch(err){
    console.log(err)
    respons.status(500).json(err)
  }
})

app.post('/register', registerValidation , async (request, respons) => { // post запрос на путь '/login' в JSON формате с использованием jwt RegisterValidator проверяет есть ли в запросе всё необходтиое, если нет запрос не выполнится
 try {
  const errors = validationResult(request)
  if(!errors.isEmpty()) {
    return respons.status(400).json(errors.array())
  }

  const password = request.body.password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const doc = new userModel({
    email: request.body.email,
    fullName: request.body.fullName,
    avatarURL: request.body.avatarURL,
    passwordHash: hash
  })

  const user = await doc.save()

  const token = jwt.sign({
    _id: user._id
  },
  'secret123' // секретный ключ
  , { // сколько времени токен действительный
     expiresIn: '30d'
  })

  const {passwordHash, ...userData} = user._doc

  respons.json({
    ...userData,
    token
  })
 } catch(err){
   console.log(err)
   respons.status(500).json(err)
 }
})

app.listen(7777, (err) => {   // Установка порта сервера, и проверка на ошибки
  if(err) return console.log(err)
  else console.log('Everything is OK')
})