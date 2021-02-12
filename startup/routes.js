
const express = require('express')
const movieRouter = require('../routes/movies')
const peopleRouter = require('../routes/people')
const cinemaRouter = require('../routes/cinema')
const movieAndCinemaRouter = require('../routes/movieAndCinema')
const userRouter = require('../routes/user')

module.exports = (app) => {
    app.use(express.json())
    app.use('/movies', movieRouter)
    app.use('/people', peopleRouter)
    app.use('/cinema', cinemaRouter)
    app.use('/movie-cinema', movieAndCinemaRouter)
    app.use('/user', userRouter)
}
