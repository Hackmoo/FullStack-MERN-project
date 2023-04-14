import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

import userModel from '../models/User.js'

export const register = async (request, response) => { // post запрос на путь '/login' в JSON формате с использованием jwt RegisterValidator проверяет есть ли в запросе всё необходтиое, если нет запрос не выполнится
    try {
     const errors = validationResult(request)
     if(!errors.isEmpty()) {
       return response.status(400).json(errors.array())
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
   
     response.json({
       ...userData,
       token
     })
    } catch(err){
      console.log(err)
      response.status(500).json(err)
    }
   }

export const login = async (request, response) => {
    try{
      const user = await userModel.findOne({ email: request.body.email })
  
      if(!user){
        return response.status(404).json({
          message: 'User is not found'
        })
      }
  
      const isValidPass = await bcrypt.compare(request.body.password, user._doc.passwordHash)
  
      if(!isValidPass) {
        return response.status(404).json({
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
  
    response.json({
      ...userData,
      token
    })
  
    } catch(err){
      console.log(err)
      respons.status(500).json(err)
    }
  }

export const getMe = async (request, response) => {
    try{ 
      const user = await userModel.findById(request.userId)
  
      if(!user){
        return response.status(404).json({
          message: "User is not found"
        })
      }
    
      const {passwordHash, ...userData} = user._doc
  
      response.json(userData)
    } catch(err){
      response.status(500).json({
        message: "You don't have permission to see it"
      })
    }
  }