import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'invalid email form').isEmail(),
    body('password' , 'password should have at least 4 characters').isLength({min: 4}), 
    body('fullName' , 'fullName should have at least 3 characters').isLength({min: 3}),
    body('avatarURL', 'invalid URL link').optional().isURL()
]

export const loginValidation = [
    body('email', 'invalid email form').isEmail(),
    body('password' , 'password should have at least 4 characters').isLength({min: 4}), 
]

export const postCreateValidation = [
    body('title', 'enter title of post').isLength({min: 3}).isString(),
    body('text' , 'enter text of post').isLength({min: 4}).isString(), 
    body('tags', 'tags must be an array').optional().isString(),
    body('imageURL', 'wrong URL to the image').optional().isString()
]