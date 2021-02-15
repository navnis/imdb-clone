const mongoose = require('mongoose')
const { DB_CONNECTION, DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env


const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log("mongodb error", error))

