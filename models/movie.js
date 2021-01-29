const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    genre: String,
    director: String,
    actors: String,
    language: String
})

module.exports = mongoose.model("movies", movieSchema)