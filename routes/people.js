const routes = require('express').Router()
const peopleController = require('../controller/people')



routes.get('/', peopleController.getAllPeople)

routes.get('/:id', peopleController.getSinglePerson)

routes.post('/', peopleController.addPerson)

routes.patch('/:id', peopleController.modifyPerson)

routes.delete('/:id', peopleController.deletePerson)


module.exports = routes

