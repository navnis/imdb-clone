const routes = require('express').Router()
const userController = require('../controller/user')

routes.get('/', userController.getAllusers)

routes.get('/:id', userController.getSingleUser)

routes.post('/', userController.createUser)




module.exports = routes