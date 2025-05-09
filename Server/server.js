const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv/config')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'https://authentication-application-client.onrender.com', // Or '*' for all origins (not recommended for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    credentials: true // If you are using cookies or other credentials
}))

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

