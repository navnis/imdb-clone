const joi = require('joi')
const Cinemas = require('../models/cinema')
const responseHandler = require('../utils/responseHandler')
const { isValidObjectId } = require('../validations/commonValidation')


////////////////////-----Schema-----///////////////////////////////

const postCinemaVal = (body) => {
    const schema = joi.object({
        name: joi.string().min(2).required(),
        address: joi.string().min(3).required(),
        location: joi.string(),
        city: joi.string().min(2).required(),
    })

    return schema.validate(body)
}

const patchCinemaVal = (body) => {
    const schema = joi.object({
        name: joi.string().min(2),
        address: joi.string().min(3),
        location: joi.string(),
        city: joi.string().min(2),
    })

    return schema.validate(body)
}


////////////////////xxxxxxxxxxxxxxx///////////////////////////////



getAllCinemas = async (req, res) => {
    try {
        const allCinemas = await Cinemas.find().populate("movies")
        responseHandler({ data: allCinemas, res })
    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }
}

getSingleCinema = async (req, res) => {
    try {
        const { id } = req.params

        const isValidId = isValidObjectId(id)
        if (!isValidId) return responseHandler({ res, error: { message: "Invalid Id" }, status: 404 })

        const cinema = await Cinemas.findById(id).populate("movies")
        if (!cinema) return responseHandler({ res, error: { message: "Cinema with this id not found" }, status: 404 })

        responseHandler({ res, data: cinema })

    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }
}

addCinema = async (req, res) => {
    try {
        const { error } = postCinemaVal(req.body)
        if (error) return responseHandler({ res, error: { message: error.details[0].message }, status: 404 })

        const newCinema = await Cinemas.create(req.body)
        responseHandler({ res, data: newCinema })

    } catch (error) {
        responseHandler({ res, error, status: 501 })

    }
}

modifyCinema = async (req, res) => {
    try {
        const { id } = req.params
        const isValidId = isValidObjectId(id)
        if (!isValidId) return responseHandler({ res, error: { message: "Invalid Id" }, status: 404 })

        const { error } = patchCinemaVal(req.body)
        if (error) return responseHandler({ res, error: { message: error.details[0].message }, status: 404 })

        const newCinema = await Cinemas.findByIdAndUpdate(id, req.body, { new: true })
        if (!newCinema) return responseHandler({ res, error: { message: "Cinema with this id does not exists" }, status: 404 })

        responseHandler({ res, data: newCinema })
    } catch (error) {
        responseHandler({ res, error, status: 501 })

    }
}

deleteCinema = async (req, res) => {
    try {
        const { id } = req.params
        const isValidId = isValidObjectId(id)
        if (!isValidId) return responseHandler({ res, error: { message: "Invalid Id" }, status: 404 })

        const cinema = await Cinemas.findByIdAndDelete(id)
        if (!cinema) return responseHandler({ res, error: { message: "Cinema with this id does not exists" }, status: 404 })

        responseHandler({ res, message: "Cinema deleted successfully" })

    } catch (error) {
        responseHandler({ res, error, status: 501 })

    }
}


module.exports = {
    getAllCinemas,
    getSingleCinema,
    addCinema,
    modifyCinema,
    deleteCinema
}