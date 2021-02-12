const routes = require('express').Router()
const cinemaController = require('../controller/cinema')
const { userAuth } = require('../middleware/auth')



routes.get('/', cinemaController.getAllCinemas)

routes.get('/:id', cinemaController.getSingleCinema)

routes.post('/', userAuth, cinemaController.addCinema)

routes.patch('/:id', userAuth, cinemaController.modifyCinema)

routes.delete('/:id', userAuth, cinemaController.deleteCinema)


module.exports = routes

