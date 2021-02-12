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

        const { password: temp, ...newUserData } = newUser._doc

        responseHandler({ data: newUserData, res })

    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }
}


module.exports = {
    getAllusers,
    getSingleUser,
    createUser
}