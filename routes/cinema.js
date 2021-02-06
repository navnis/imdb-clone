const routes = require('express').Router()
const cinemaController = require('../controller/cinema')



routes.get('/', cinemaController.getAllCinemas)

routes.get('/:id', cinemaController.getSingleCinema)

routes.post('/', cinemaController.addCinema)

routes.patch('/:id', cinemaController.modifyCinema)

routes.delete('/:id', cinemaController.deleteCinema)


module.exports = routes

