import express, {
  type NextFunction,
  type Request,
  type Response
} from 'express'

import path from 'path'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import corsOptions from './src/config/corsOptions'
import { logger } from './src/middleware/logEvents'
import errorHandler from './src/middleware/errorHandler'
// import verifyJWT from './src/middleware/verifyJWT'
import credentials from './src/middleware/credentials'
import connectDB from './src/config/dbConn'
// import { auth, logout, refresh, register, root } from "./src/routes";
// import { users, employees } from "./src/routes/api";
import createHttpError from 'http-errors'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const PORT = process.env.PORT ?? 3500

const app = express()
// Connect to MongoDB
void connectDB()

// custom middleware logger
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use(logger)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')))

// routes
// app.use("/", root);
// app.use("/register", register);
// app.use("/auth", auth);
// app.use("/refresh", refresh);
// app.use("/logout", logout);

// app.use("/employees", verifyJWT, employees);
// app.use("/users", verifyJWT, users);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  try {
    throw createHttpError.NotFound('404 Not Found')
  } catch (error) {
    next(error)
  }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
