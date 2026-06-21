import express from 'express'
import { login, register } from '../controllers/auth.js'
import { createUserSchema, loginSchema } from '../schemas/userSchema.js'
import { validate } from '../middlewares/validate.js'
import { authProtect } from '../middlewares/authProtect.js'
import { getCurrentUser } from '../controllers/user.js'

export const auth_routes = express.Router()

auth_routes.post('/register',validate(createUserSchema),register)
auth_routes.post('/login',validate(loginSchema),login)
auth_routes.get('/me',authProtect,getCurrentUser)