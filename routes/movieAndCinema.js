const routes = require('express').Router()
const movieAndCinemaController = require('../controller/movieAndCinema')
const { userAuth } = require('../middleware/auth')


routes.get('/', userAuth, movieAndCinemaController.getAllMovieAndCinema)

routes.get('/:id', userAuth, movieAndCinemaController.getSingleMovieAndCinema)

routes.post('/', userAuth, movieAndCinemaController.addMovieAndCinema)

routes.patch('/:id', userAuth, movieAndCinemaController.modifyMovieAndCinema)

routes.delete('/:id', userAuth, movieAndCinemaController.deleteMovieAndCinema)


module.exports = routes
