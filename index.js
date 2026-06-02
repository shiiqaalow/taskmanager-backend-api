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
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './utils/swagger.js'
import { limiter } from './middlewares/rateLimiter.js'

const app = express()
const port = process.env.PORT || 5000

// security protection
app.use(helmet())

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:5879']
}))

app.use(limiter)


// ✅ FIX 1: correct morgan condition
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/auth', auth_routes)
app.use('/dash', admin_dash)
app.use('/dash', user_dash)
app.use('/task', task_routes)

app.use(errorHandler)


// ✅ FIX 2: correct MongoDB connection logic
const mongoUri =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URL_PRO
        : process.env.MONGODB_URL_DEV


if (!mongoUri) {
    console.log('❌ MongoDB URI is missing')
    process.exit(1)
}

mongoose.connect(mongoUri)
    .then(() => {
        console.log('MongoDB connected successfully')

        app.listen(port, () => {
            console.log(`https://localhost ${port} server is running.`)
        })
    })
    .catch((error) => {
        console.log('Failed to connect mongoDB', error)
        process.exit(1)
    })