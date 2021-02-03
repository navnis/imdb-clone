
const express = require('express')
const movieRouter = require('../routes/movies')
const peopleRouter = require('../routes/people')


module.exports = (app) => {
    app.use(express.json())
    app.use('/movies', movieRouter)
    app.use('/people', peopleRouter)
}
