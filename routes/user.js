const routes = require('express').Router()
const userController = require('../controller/user')
const { userAuth } = require('../middleware/auth')


routes.get('/', userAuth, userController.getAllusers)

routes.get('/:id', userAuth, userController.getSingleUser)

routes.post('/sign-in', userController.signInUser)

routes.post('/', userController.createUser)

routes.post('/forgot-password', userController.forgotPassword)





module.exports = routes