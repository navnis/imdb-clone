const routes = require('express').Router()
const movieController = require('../controller/movies')


//get all movies
routes.get('/', movieController.getAllMovies)

//get single movie
routes.get('/:id', movieController.getSingleMovieById)

//post new data
routes.post('/', movieController.postMovie)

//patch movie
routes.patch('/:id', movieController.patchMovie)

//delete movie
routes.delete('/:id', movieController.deleteMovie)

module.exports = routes
