const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv/config')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const authRoutes = require('./routes/authentication')
app.use('/api',authRoutes)

mongoose.connect(process.env.DATABASE_URI)
    .then(()=>{
        console.log("Database Connected")
        app.listen(process.env.PORT,()=>{
            console.log(`Server Connected on http://localhost/${process.env.PORT}`)
        })
    })
    .catch(error => console.log("Error connecting to MongoDB:",error.message))

