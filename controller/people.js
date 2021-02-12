const joi = require('joi')
const People = require('../models/people')
const responseHandler = require('../utils/responseHandler')
const { isValidObjectId } = require('../validations/commonValidation')


////////////////////////---Schema----////////////////////////////

const postPersonVal = (data) => {
    const dateVal = joi.date().less('now').required()
    const schema = joi.object({
        name: joi.string().required(),
        dob: dateVal,
        dod: joi.date().less('now'),
        gender: joi.string().valid("male", "female", "others").required(),
        email: joi.string().email().required(),
        tag: joi.array().items(joi.string().valid("actor", "director")).required(),
    })

    return schema.validate(data)
}

const patchPersonVal = (data) => {
    const dateVal = joi.date().less('now')
    const schema = joi.object({
        name: joi.string(),
        dob: dateVal,
        dod: dateVal,
        gender: joi.string().valid("male", "female", "others"),
        email: joi.string().email(),
        tag: joi.array().items(joi.string().valid("actor", "director")),
    })

    return schema.validate(data)
}




//////////////////////////////////////////////////////////////////





// get all people
const getAllPeople = async (req, res) => {

    try {
        const { limit = 20, offset = 0, sortKey = "name", sortOrder = 1 } = req.query
        const allPeople = await People.find().collation({ locale: "en", strength: 2 }).sort({ [sortKey]: sortOrder }).limit(+limit || 20).skip(+offset || 0)
        const totalCount = await People.countDocuments()
        responseHandler({ data: { result: allPeople, totalCount }, res })
    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }
}

// get single person
const getSinglePerson = async (req, res) => {

    try {
        const { id } = req.params

        const isValidId = isValidObjectId(id)
        if (!isValidId) return responseHandler({ res, error: { message: "Invalid Id" }, status: 404 })

        const person = await People.findById(id)
        if (!person) return responseHandler({ res, error: { message: "Person with this id not found" }, status: 404 })


        responseHandler({ res, data: person })

    } catch (error) {
        responseHandler({ res, error, status: 501 })

    }


}

// add new people
const addPerson = async (req, res) => {

    try {
        const { error } = postPersonVal(req.body)
        if (error) return responseHandler({ res, error: { message: error.details[0].message }, status: 404 })

        const { email } = req.body
        const personByEmail = await People.findOne({ email })
        if (personByEmail) return responseHandler({ res, error: { message: "Person with this email already exists" }, status: 404 })

        const newPerson = new People(req.body)
        await newPerson.save()
        responseHandler({ res, data: newPerson })
    } catch (error) {
        responseHandler({ res, error, status: 501 })

    }



}


// modify person
const modifyPerson = async (req, res) => {
    try {
        const { id } = req.params
        const isValidId = isValidObjectId(id)
        if (!isValidId) return responseHandler({ res, error: { message: "Invalid Id" }, status: 404 })

        const { error } = patchPersonVal(req.body)
        if (error) return responseHandler({ res, error: { message: error.details[0].message }, status: 404 })

        const { email } = req.body
        const personByEmail = await People.findOne({ email })
        if (personByEmail) return responseHandler({ res, error: { message: "Person with this email already exists" }, status: 404 })

        const oldPerson = await People.findById(id)
        if (!oldPerson) return responseHandler({ res, error: { message: "Person with this id does not exists" }, status: 404 })

        const newPerson = await People.findByIdAndUpdate(id, req.body, { new: true })

        responseHandler({ res, data: newPerson })
    } catch (error) {
        responseHandler({ res, error, status: 501 })

    }

}


// delete person
const deletePerson = async (req, res) => {

    try {
        const { id } = req.params
        const isValidId = isValidObjectId(id)
        if (!isValidId) return responseHandler({ res, error: { message: "Invalid Id" }, status: 404 })

        const oldPerson = await People.findByIdAndDelete(id)
        if (!oldPerson) return responseHandler({ res, error: { message: "Person with this id does not exists" }, status: 404 })

        responseHandler({ res, message: "Deleted Successfully" })
    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }

}



module.exports = {
    getAllPeople,
    getSinglePerson,
    addPerson,
    modifyPerson,
    deletePerson
}


