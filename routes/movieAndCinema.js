const routes = require('express').Router()
const movieAndCinemaController = require('../controller/movieAndCinema')


routes.get('/', movieAndCinemaController.getAllMovieAndCinema)

routes.get('/:id', movieAndCinemaController.getSingleMovieAndCinema)

routes.post('/', movieAndCinemaController.addMovieAndCinema)

routes.patch('/:id', movieAndCinemaController.modifyMovieAndCinema)

routes.delete('/:id', movieAndCinemaController.deleteMovieAndCinema)


module.exports = routes
