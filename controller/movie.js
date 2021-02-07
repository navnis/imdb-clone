
const joi = require('joi')
const mongoose = require('mongoose')
const { isValidObjectId } = require('../validations/commonValidation')
const Movies = require('../models/movie')
const MovieAndCinemas = require('../models/movieAndCinema')

////////////////Schemas////////////////////////////////

const postMovieVal = (body) => {
    const val = joi.string().required()
    const val2 = joi.array().items(joi.string()).required()
    const schema = joi.object({
        title: val,
        year: joi.number().min(1000).required(),
        genre: val2,
        directors: val2,
        actors: val2,
        languages: joi.array().items(joi.string().valid("en", "hi", "ja", "pa")).required(),
    })

    return schema.validate(body)
}

const patchMovieVal = (body) => {
    const val = joi.string()
    const val2 = joi.array().items(joi.string())
    const schema = joi.object({
        title: val,
        year: joi.number().min(1000),
        genre: val2,
        directors: val2,
        actors: val2,
        languages: joi.array().items(joi.string().valid("en", "hi", "ja", "pa")),
    })
    return schema.validate(body)
}

//////////////////////////////////////////////////////////////////



const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movies.find().populate([{
            path: "actors directors",
            select: "name"
        }])
        res.send({ success: true, result: allMovies })
    } catch (error) {
        res.status(501).send({ success: false, error: error.message })
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

        const movie = await Movies.findById(id).lean().select("-__v")

        if (!movie) {
            return res.status(404).send({
                success: false,
                error: "Movie not found"
            })
        }

        // const allCinemas = await MovieAndCinemas.find({ movieId: id }).populate({
        //     path: "cinemaId",
        //     select: {
        //         _id: 1,
        //         name: 1,
        //         address: 1,
        //         city: 1
        //     },
        // }).select("-_id -movieId").lean()

        const allCinemas = await MovieAndCinemas.aggregate([
            {
                $match: {
                    movieId: movie._id
                }
            },
            {
                $lookup: {
                    from: "cinemas",
                    localField: "cinemaId",
                    foreignField: "_id",
                    as: "cinema"
                }
            },
            {
                $project: {
                    cinema: 1,
                    _id: 0,
                    movieId: 1,
                }
            }, {
                $unwind: "$cinema"
            }
            , {
                $project: {
                    'cinema.location': 0
                }
            },
            {
                $group: {
                    '_id': '$movieId',
                    'allCinemas': {
                        "$push": "$cinema"
                    }
                }
            }
        ])
        movie.cinemas = allCinemas[0].allCinemas
        res.send({ success: true, result: movie })

    } catch (error) {
        console.log(error)
        res.status(501).send({ success: false, error: error.message })
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
        res.status(501).send({ success: false, error: error.message })
    }
}



const patchMovie = async (req, res) => {
    try {


        const { id } = req.params

        const isValidId = isValidObjectId(id)

        if (!isValidId) {
            return res.status(400).send({
                success: false,
                error: "Invalid Id"
            })
        }

        const { error } = patchMovieVal(req.body)
        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
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
        res.status(501).send({ success: false, error: error.message })

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
        res.status(501).send({ success: false, error: error.message })

    }
}


module.exports = {
    getAllMovies,
    getSingleMovieById,
    postMovie,
    patchMovie,
    deleteMovie
}
