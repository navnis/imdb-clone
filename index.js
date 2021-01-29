const express = require('express')
const app = express()


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log("Listening on port 4000"))

//db
require('./startup/db')

//routes
require('./startup/routes')(app)
