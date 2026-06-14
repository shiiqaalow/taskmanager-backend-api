import express from 'express'
import { login, register } from '../controllers/auth.js'
import { createUserSchema, loginSchema } from '../schemas/userSchema.js'
import { validate } from '../middlewares/validate.js'
import { authProtect } from '../middlewares/authProtect.js'
import { authorize } from '../middlewares/authorize.js'

export const auth_routes = express.Router()

auth_routes.post('/signup',validate(createUserSchema),register)
auth_routes.post('/signin',validate(loginSchema),login)