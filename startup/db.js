const mongoose = require('mongoose')
const { DB_CONNECTION, DATABASE } = process.env

mongoose.connect(DB_CONNECTION + DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log("mongodb error", error))

