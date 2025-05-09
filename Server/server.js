const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv/config')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4000

const authRoutes = require('./routes/authentication')
app.use('/api',authRoutes)

mongoose.connect(process.env.DATABASE_URI)
    .then(()=>{
        console.log("Database Connected")
        app.listen(port,()=>{
            console.log(`Server Connected on http://localhost/${port}`)
        })
    })
    .catch(error => console.log("Error connecting to MongoDB:",error.message))

