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
    directors: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "peoples"
    }],
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "peoples"
    }],
    languages: {
        type: [String],
        required: true,
        enum: ["en", "hi", "ja", "pa"]
    }
})


// movieSchema.post(/^findOne/, function (document) {
//     if (document) {
//         document.genre = document.genre.join(", ")
//         document.actors = document.actors.join(", ")
//         document.director = document.director.join(", ")
//         document.language = document.language.join(", ")
//     }

// })

module.exports = mongoose.model("movies", movieSchema)