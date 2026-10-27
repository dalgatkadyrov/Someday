import express from "express";
import 'dotenv/config'
import cardRoutes from './routes/cards.route.js'
import mongoose from "mongoose";
import cors from "cors";

const app = express()
const port = process.env.PORT

app.use(cors())

mongoose.connect(process.env.BASE).then(()=>{
    app.listen(port,()=>{
        console.log(`server runs on ${port}`)
    })
}).catch((error)=>{
    console.error('db error', error)
})

app.use(express.json())
app.use('/api/cards', cardRoutes)