
const express = require('express')
const movieRouter = require('../routes/movies')

module.exports = (app) => {
    app.use(express.json())
    app.use('/movies', movieRouter)
}
