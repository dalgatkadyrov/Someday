import express from "express";
import 'dotenv/config'
import cardRoutes from './routes/cards.route.js'
import authRoutes from './routes/auth.route.js'
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./config/db.js";
import session from "express-session";
import MongoStore from 'connect-mongo'


const app = express()
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server runs on ${port}`)
    })
}).catch((error) => {
    console.error('db error', error)
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.BASE, ttl: 30 * 24 * 60 * 60 }),
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    }
}))

app.use('/api/auth', authRoutes)
app.use('/api/cards', cardRoutes)
