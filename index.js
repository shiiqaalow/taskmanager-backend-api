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
const app = express()
const port = process.env.PORT || 5000

// security protection
app.use(helmet())

app.use(express.json())
app.use(cors(
    {
        origin: [ 'http://localhost:5879' ]
    }
))
app.use(limiter)


if(process.env.NODE_ENV == 'development'? process.env.MONGO_URL_DEV : process.env.MONGODB_URL_PRO){
    app.use(morgan('dev'))
}


// routes

// swagger api
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))


// auth_routes
app.use('/auth',auth_routes )
app.use('/dash',admin_dash )
app.use('/dash',user_dash )

// task_routes
app.use('/task',task_routes)


// error message Handler
app.use(errorHandler)


mongoose.connect(process.env.MONGODB_URL_DEV)
    .then(()=>{
        console.log('MongoDB connected successfully')
        app.listen(port,()=>{
            console.log(`https://localhost ${port} server is running. `)
        })
    })
    .catch((error)=> console.log('Failed to connect mongoDB',error))