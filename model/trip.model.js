const mongoose = require('mongoose')    

const tripSchema = mongoose.Schema({
    name: String,
    email : String,
    destination : String,
    travelers: Number,
    budget: Number
})

const TripModel = mongoose.model("TripModel", tripSchema)

module.exports = TripModel