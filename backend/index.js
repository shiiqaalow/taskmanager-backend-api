import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

import { errorHandler } from './middlewares/errorHandler.js'
import { auth_routes } from './routes/authRoutes.js'
import { admin_dash, user_dash } from './routes/dashboard.js'
import { task_routes } from './routes/taskRoutes.js'
import  swaggerUi  from 'swagger-ui-express'
import { swaggerSpec } from './utils/swagger.js'
import { limiter } from './middlewares/rateLimiter.js'
import { user_routes } from './routes/user.js'
const app = express()
const port = process.env.PORT || 5000
const mongoURI = 
    process.env.NODE_ENV === 'development'
        ? process.env.MONGO_URI_DEV
        : process.env.MONGO_URI_PRO

// security protection
app.use(helmet())

app.use(express.json())
app.use(cors(
    {
        origin: [ 
            'http://localhost:5879' ,
            'http://localhost:5173',
        ]
    }
))
app.use(limiter)


if(process.env.NODE_ENV === 'development'? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO){
    app.use(morgan('dev'))
}


// routes

// routes
app.get('/',(req,res)=>{
    res.status(200).send('Server is working 👍')
})

// swagger api
app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))


// auth_routes
app.use('/api/auth',auth_routes )
app.use('/api/dash',admin_dash )
app.use('/api/dash',user_dash )
app.use('/api/users',user_routes)

// task_routes
app.use('/api/task',task_routes)


// error message Handler
app.use(errorHandler)


mongoose.connect(mongoURI)
    .then(()=>{
        console.log('MongoDB connected successfully')
        app.listen(port,()=>{
            console.log(`server is running on port http://localhost:${port} `)
        })
    })
    .catch((error)=> {
        console.log('Failed to connect mongoDB',error)
        process.exit(1)
    })
    