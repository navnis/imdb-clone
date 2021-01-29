// const express = require('express')
// const joi = require('joi')

// const app = express()
// app.listen(4000, () => console.log("Listening on port 4000"))

// const movies = require('./movies.json')

// app.use(express.json())



// //get all movies
// app.get('/movies', (req, res) => {
//     try {
//         res.send({ success: true, result: movies })
//     } catch (error) {
//         res.status(400).send({ success: false, error: error.message })
//     }
// })


// const singleMovieValidation = (id) => {
//     const schema = joi.object({
//         id: joi.string().pattern(new RegExp('^[t]{2}[0-9]{7}$')).required()
//     })

//     return schema.validate(id)
// }


// //get single movie
// app.get('/movies/:id', (req, res) => {
//     try {

//         const { error } = singleMovieValidation(req.params)
//         if (error) {
//             return res.send({
//                 success: false,
//                 error: error.details[0].message
//             })
//         }

//         const { id } = req.params
//         const filteredMovie = movies.find(movie => movie.id === id)

//         if (!filteredMovie) {
//             return res.status(400).send({
//                 success: false,
//                 error: "Movie not found"
//             })
//         }

//         res.send({ success: true, result: filteredMovie })

//     } catch (error) {
//         res.status(400).send({ success: false, error: error.message })
//     }
// })

// const postMovieVal = (body) => {
//     const val = joi.string().required()
//     const schema = joi.object({
//         title: val,
//         year: joi.number().required(),
//         genre: val,
//         director: val,
//         actors: val,
//         language: val,
//     })

//     return schema.validate(body)
// }

// //post new data
// app.post('/movies/', (req, res) => {
//     try {
//         const { error } = postMovieVal(req.body)
//         if (error) {
//             return res.status(400).send({
//                 success: false,
//                 error: error.details[0].message
//             })
//         }
//         const { title } = req.body

//         const findMovie = movies.findIndex(movie => movie.title === title)

//         if (findMovie !== -1) {
//             return res.status(400).send({
//                 success: false,
//                 error: "Movie already exists"
//             })
//         }

//         const createId = "tt" + Math.floor(Math.random(0, 1) * 10000000)

//         const newMovie = {
//             id: createId,
//             ...req.body
//         }

//         movies.push(newMovie)

//         res.send({ success: true, result: newMovie })

//     } catch (error) {
//         res.status(400).send({ success: false, error: error.message })
//     }
// })

// const patchMovieVal = (body) => {
//     const val = joi.string()
//     const schema = joi.object({
//         // id: val.pattern(new RegExp('^[t]{2}[0-9]{7}$')).required(),
//         title: val,
//         year: joi.number(),
//         genre: val,
//         director: val,
//         actors: val,
//         language: val,
//     })

//     return schema.validate(body)
// }

// //patch movie
// app.patch('/movies/:id', (req, res) => {
//     try {
//         const { error } = patchMovieVal(req.body)
//         if (error) {
//             return res.status(400).send({
//                 success: false,
//                 error: error.details[0].message
//             })
//         }

//         const { error: error2 } = singleMovieValidation(req.params)

//         if (error2) {
//             return res.status(400).send({
//                 success: false,
//                 error: "Invalid Id"
//             })
//         }

//         const { id } = req.params
//         const findMovieIndex = movies.findIndex(movie => movie.id === id)

//         if (findMovieIndex === -1) {
//             return res.status(404).send({
//                 success: false,
//                 error: "Movie not found with this id"
//             })
//         }

//         const { title } = req.body

//         const findMovie = movies.findIndex(movie => movie.title === title)

//         if (findMovie !== -1) {
//             return res.status(400).send({
//                 success: false,
//                 error: "Movie already exists"
//             })
//         }



//         const oldMovieData = movies[findMovieIndex]


//         const updatedMovieData = {
//             ...oldMovieData,
//             ...req.body
//         }

//         movies[findMovieIndex] = updatedMovieData
//         res.send({ success: true, result: updatedMovieData })

//     } catch (error) {
//         res.status(400).send({ success: false, error: error.message })

//     }
// })


// //delete movie

// app.delete('/movies/:id', (req, res) => {

//     try {
//         const { error } = singleMovieValidation(req.params)

//         if (error) {
//             return res.status(400).send({
//                 success: false,
//                 error: "Invalid Id"
//             })
//         }

//         const { id } = req.params
//         const findMovieIndex = movies.findIndex(movie => movie.id === id)

//         if (findMovieIndex === -1) {
//             return res.status(404).send({
//                 success: false,
//                 error: "Movie not found with this id"
//             })
//         }

//         movies.splice(findMovieIndex, 1)
//         res.send({ success: true, message: "Deleted Successfully" })


//     } catch (error) {
//         res.status(400).send({ success: false, error: error.message })

//     }
// })







