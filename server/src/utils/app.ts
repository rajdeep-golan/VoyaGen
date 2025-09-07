import express from 'express'
import cors from 'cors'
import { ORIGIN } from '../constants/index'
import session from 'express-session';


// initialize app
const app = express()

// middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure: true if using HTTPS
  })
);
app.use(cors({ origin: ORIGIN }))
app.use(express.json()) // body parser
app.use(express.urlencoded({ extended: false })) // url parser

export default app
