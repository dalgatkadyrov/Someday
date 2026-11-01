import express from "express";
import 'dotenv/config'
import cardRoutes from './routes/cards.route.js'
import authRoutes from './routes/auth.route.js'
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./config/db.js";
import session from "express-session";
import MongoStore from 'connect-mongo'
import path from 'node:path'
import { fileURLToPath } from "node:url";


const app = express()
const port = process.env.PORT
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const clientDist = path.resolve(__dirname, '../client/dist')


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())

app.set('trust proxy', 1)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.BASE, ttl: 30 * 24 * 60 * 60 }),
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production '
    }
}))

app.use('/api/auth', authRoutes)
app.use('/api/cards', cardRoutes)

app.use(express.static(clientDist))

app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith('/api/')) return next()
    res.sendFile(path.join(clientDist, 'index.html'))
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server runs on ${port}`)
    })
}).catch((error) => {
    console.error('db error', error)
})
