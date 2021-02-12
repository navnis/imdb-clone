const routes = require('express').Router()
const peopleController = require('../controller/people')
const { userAuth } = require('../middleware/auth')



routes.get('/', peopleController.getAllPeople)

routes.get('/:id', peopleController.getSinglePerson)

routes.post('/', userAuth, peopleController.addPerson)

routes.patch('/:id', userAuth, peopleController.modifyPerson)

routes.delete('/:id', userAuth, peopleController.deletePerson)


module.exports = routes

