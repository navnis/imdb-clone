const joi = require('joi')
const Users = require('../models/user')
const bcrypt = require('bcrypt')
const responseHandler = require('../utils/responseHandler')


/////////////Schema/////////////////////////////////////

const postVal = (body) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().required(),
        password: joi.string().required(),
        countryCode: joi.string(),
        isCinemaAdmin: joi.boolean()

    })

    return schema.validate(body)
}

const signInVal = (body) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    return schema.validate(body)
}

/////////////-------********----////////////////////////







const getAllusers = async (req, res) => {
    try {
        const allUsers = await Users.find()
        responseHandler({ data: allUsers, res })
    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }
}


const getSingleUser = () => {

}

const createUser = async (req, res) => {
    try {
        const { email, password, countryCode, phone } = req.body
        const { error } = postVal(req.body)
        if (error) return responseHandler({ res, error: { message: error.details[0].message }, status: 404 })

        let user = await Users.findOne({
            $or: [{ email }, { phone, countryCode }]
        })

        if (user) return responseHandler({ res, error: { message: "User with this email or phone already exists" }, status: 400 })

        const salt = bcrypt.genSaltSync(8)

        const encryptedPaswd = bcrypt.hashSync(password, salt)

        const newUser = await Users.create({ ...req.body, password: encryptedPaswd })

        const token = newUser.generateAuthToken()

        const { password: temp, ...newUserData } = newUser._doc

        responseHandler({ data: { user: newUserData, token }, res })

    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }
}


const signInUser = async (req, res) => {
    try {
        const { error } = signInVal(req.body)
        if (error) return responseHandler({ res, error: { message: error.details[0].message }, status: 404 })

        const { email, password } = req.body
        const user = await Users.findOne({ email }).select("password _id name email phone countryCode")
        if (!user) return responseHandler({ res, error: { message: "Invalid Email or password" }, status: 400 })

        const pswdMatch = bcrypt.compareSync(password, user.password)
        if (!pswdMatch) return responseHandler({ res, error: { message: "Invalid Email or password" }, status: 400 })

        const token = user.generateAuthToken()
        const { password: temp, ...userData } = user._doc
        responseHandler({ data: { user: userData, token }, res })

    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }
}

const forgotPassword = async (req, res) => {

}




module.exports = {
    getAllusers,
    getSingleUser,
    createUser,
    signInUser,
    forgotPassword
}