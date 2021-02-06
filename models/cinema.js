const mongoose = require('mongoose')


const cinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    address: {
        type: String,
        required: true,
        minlength: 3
    },
    location: {
        type: String,
    },
    city: {
        type: String,
        required: true,
        minlength: 2
    }
})


module.exports = mongoose.model("cinemas", cinemaSchema)