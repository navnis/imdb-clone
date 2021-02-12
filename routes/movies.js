const routes = require('express').Router()
const movieController = require('../controller/movie')
const { userAuth } = require('../middleware/auth')

//get all movies
routes.get('/', movieController.getAllMovies)

//get single movie
routes.get('/:id', movieController.getSingleMovieById)

//post new data
routes.post('/', userAuth, movieController.postMovie)

//patch movie
routes.patch('/:id', userAuth, movieController.patchMovie)

//delete movie
routes.delete('/:id', userAuth, movieController.deleteMovie)

module.exports = routes
