import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'invalid email form').isEmail(),
    body('password' , 'password should have at least 4 characters').isLength({min: 4}), 
    body('fullName' , 'fullName should have at least 3 characters').isLength({min: 3}),
    body('avatarURL', 'invalid URL link').optional().isURL()
]