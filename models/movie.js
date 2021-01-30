const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        minlength: 4,
        min: 1000,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    director: {
        type: [String],
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    language: {
        type: [String],
        required: true,
        enum: ["en", "hi", "ja", "pa"]
    }
})

movieSchema.post(/^findOne/, function (document) {
    console.log(this.getFilter(), "document")
    document.genre = document.genre.join(", ")
    document.actors = document.actors.join(", ")
    document.director = document.director.join(", ")
    document.language = document.language.join(", ")
})

module.exports = mongoose.model("movies", movieSchema)