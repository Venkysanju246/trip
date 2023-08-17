const express = require('express')
const app = express()
const cors = require('cors')
const connectionToDb = require('./config/connection')
const tripRoute = require('./controllers/trip.controller')
app.use(cors())
app.use(express.json())
app.use("/trip", tripRoute)

app.listen(8000,async ()=>{
    await connectionToDb
    console.log("connected to db")
console.log('listening on port 8000')
})