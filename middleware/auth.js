const jwt = require('jsonwebtoken')
const responseHandler = require('../utils/responseHandler')
const Users = require('../models/user')


const userAuth = async (req, res, next) => {
    try {
        const token = req.headers["x-auth-token"]

        if (!token) return responseHandler({ res, error: { message: "Please send token" }, status: 400 })

        const tokenData = jwt.verify(token, process.env.JWTKEY)

        const user = await Users.findById(tokenData.userId)

        if (!user) return responseHandler({ res, error: { message: "Invalid User or User not found" }, status: 400 })

        req.userId = user._id
        req.user = user

        next()

    } catch (error) {
        console.log(error, "error")
        responseHandler({ res, error, status: 501 })
    }
}


module.exports = {
    userAuth
}