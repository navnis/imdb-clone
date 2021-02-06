const mongoose = require('mongoose')



const movieAndCinemaSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "movies"
    },
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "cinemas"
    }
})

module.exports = mongoose.model("movieAndCinemas", movieAndCinemaSchema)