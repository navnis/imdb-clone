const express = require('express')
const app = express()


//env
require('dotenv').config()

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log("Listening on port", PORT))

//db
require('./startup/db')

//routes
require('./startup/routes')(app)
