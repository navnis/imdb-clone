
const joi = require('joi')
const mongoose = require('mongoose')
const { isValidObjectId } = require('../validations/commonValidation')
const movies = [{}]
const Movies = require('../models/movie')

////////////////Schemas////////////////////////////////

const postMovieVal = (body) => {
    const val = joi.string().required()
    const schema = joi.object({
        title: val,
        year: val,
        genre: val,
        director: val,
        actors: val,
        language: val,
    })

    return schema.validate(body)
}

const patchMovieVal = (body) => {
    const val = joi.string()
    const schema = joi.object({
        title: val,
        year: val,
        genre: val,
        director: val,
        actors: val,
        language: val,
    })

    return schema.validate(body)
}

//////////////////////////////////////////////////////////////////



const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movies.find()
        res.send({ success: true, result: allMovies })
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
}



const getSingleMovieById = async (req, res) => {
    try {

        const { id } = req.params
        const isValidId = isValidObjectId(id)

        if (!isValidId) {
            return res.send({
                success: false,
                error: "Invalid Id"
            })
        }

        const movie = await Movies.findById(id).lean()

        if (!movie) {
            return res.status(404).send({
                success: false,
                error: "Movie not found"
            })
        }

        res.send({ success: true, result: movie })

    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
}



const postMovie = async (req, res) => {
    try {
        const { error } = postMovieVal(req.body)
        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }
        const { title } = req.body
        const movie = await Movies.findOne({ title }).lean()

        if (movie) {
            return res.status(400).send({
                success: false,
                error: "Movie already exists"
            })
        }

        const newMovie = await Movies.create(req.body)

        res.send({ success: true, result: newMovie })

    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
}



const patchMovie = async (req, res) => {
    try {
        const { error } = patchMovieVal(req.body)
        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        const { id } = req.params

        const isValidId = isValidObjectId(id)

        if (!isValidId) {
            return res.status(400).send({
                success: false,
                error: "Invalid Id"
            })
        }

        const movie = await Movies.findById(id)

        if (!movie) {
            return res.status(404).send({
                success: false,
                error: "Movie not found with this id"
            })
        }

        const { title } = req.body

        const isMovieExists = await Movies.findOne({ title }).lean()

        if (isMovieExists) {
            return res.status(400).send({
                success: false,
                error: "Movie already exists"
            })
        }

        const updatedMovieData = await Movies.findByIdAndUpdate(id, req.body, { new: true })

        res.send({ success: true, result: updatedMovieData })

    } catch (error) {
        res.status(400).send({ success: false, error: error.message })

    }
}




const deleteMovie = async (req, res) => {

    try {
        const { id } = req.params

        const isValidId = isValidObjectId(id)

        if (!isValidId) {
            return res.status(400).send({
                success: false,
                error: "Invalid Id"
            })
        }

        const movie = await Movies.findById(id)

        if (!movie) {
            return res.status(404).send({
                success: false,
                error: "Movie not found with this id"
            })
        }

        await Movies.findByIdAndDelete(id)

        res.send({ success: true, message: "Deleted Successfully" })

    } catch (error) {
        res.status(400).send({ success: false, error: error.message })

    }
}


module.exports = {
    getAllMovies,
    getSingleMovieById,
    postMovie,
    patchMovie,
    deleteMovie
}
