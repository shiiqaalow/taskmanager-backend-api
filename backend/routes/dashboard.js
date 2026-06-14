import express from 'express'
import { authProtect } from '../middlewares/authProtect.js'
import { authorize } from '../middlewares/authorize.js'

export const admin_dash = express.Router()
export const user_dash = express.Router()

admin_dash.post('/admin',authProtect,authorize('admin') ,(req,res)=> {
    res.json({message:' You are in the admin Dashboard.'})
})

user_dash.post('/user',authProtect,authorize('user'),(req,res)=> {
    res.json({message:' You are in the user Dashboard.'})
})