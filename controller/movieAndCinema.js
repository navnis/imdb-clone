const joi = require('joi')
const MovieAndCinemas = require('../models/movieAndCinema')
const responseHandler = require('../utils/responseHandler')
const { isValidObjectId } = require('../validations/commonValidation')


///////////////////-------Schema------///////////////////////////////
postMovieCinemaVal = (body) => {
    const schema = joi.object({
        movieId: joi.string().required(),
        cinemaId: joi.string().required()
    })

    return schema.validate(body)
}


postMovieCinemaVal = (body) => {
    const schema = joi.object({
        movieId: joi.string(),
        cinemaId: joi.string()
    })

    return schema.validate(body)
}

///////////////////xxxxxxxxxxxxxxxxxxx///////////////////////////////




const getAllMovieAndCinema = async (req, res) => {
    try {
        const allMovieCinemas = await MovieAndCinemas.find().populate("movieId cinemaId")
        responseHandler({ data: allMovieCinemas, res })
    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }

}

const getSingleMovieAndCinema = async (req, res) => {
    try {

        const { id } = req.params

        const isValidId = isValidObjectId(id)
        if (!isValidId) return responseHandler({ res, error: { message: "Invalid Id" }, status: 404 })

        const movieCinema = await MovieAndCinemas.findById(id).populate("movieId cinemaId")
        if (!movieCinema) return responseHandler({ res, error: { message: "Movie Cinema with this id not found" }, status: 404 })

        responseHandler({ res, data: movieCinema })
    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }

}

const addMovieAndCinema = async (req, res) => {
    try {
        const { error } = postMovieCinemaVal(req.body)
        if (error) return responseHandler({ res, error: { message: error.details[0].message }, status: 404 })

        const newMovieCinema = await MovieAndCinemas.create(req.body)
        responseHandler({ res, data: newMovieCinema })
    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }

}

const modifyMovieAndCinema = async (req, res) => {
    try {

        const { id } = req.params
        const isValidId = isValidObjectId(id)
        if (!isValidId) return responseHandler({ res, error: { message: "Invalid Id" }, status: 404 })

        const { error } = postMovieCinemaVal(req.body)
        if (error) return responseHandler({ res, error: { message: error.details[0].message }, status: 404 })

        const newMovieCinema = await MovieAndCinemas.findByIdAndUpdate(id, req.body, { new: true })
        if (!newMovieCinema) return responseHandler({ res, error: { message: "Movie Cinema with this id does not exists" }, status: 404 })

        responseHandler({ res, data: newMovieCinema })

    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }

}

const deleteMovieAndCinema = async (req, res) => {
    try {
        const { id } = req.params
        const isValidId = isValidObjectId(id)
        if (!isValidId) return responseHandler({ res, error: { message: "Invalid Id" }, status: 404 })

        const movieCinema = await MovieAndCinemas.findByIdAndDelete(id)
        if (!movieCinema) return responseHandler({ res, error: { message: "Movie Cinema with this id does not exists" }, status: 404 })

        responseHandler({ res, message: "Movie Cinema deleted successfully" })


    } catch (error) {
        responseHandler({ res, error, status: 501 })
    }

}


module.exports = {
    getAllMovieAndCinema,
    getSingleMovieAndCinema,
    addMovieAndCinema,
    modifyMovieAndCinema,
    deleteMovieAndCinema
}
