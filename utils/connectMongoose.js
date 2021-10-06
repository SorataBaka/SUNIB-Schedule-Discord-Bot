const URI = process.env.URI
const mongoose = require("mongoose")
module.exports = async() => {
    await mongoose.connect(URI).then(async (data, error) => {
        if(error) return console.error("Failed to Connect", error)
        if(data) console.log("Connected to MongoDB")
    })
}