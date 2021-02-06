const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const commonReg = {
    email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
    date: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
}


const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function () {
                return new Date(this.dob).toISOString() <= new Date().toISOString()
            },
            message: function () {
                return "Invalid Date of Birth"
            }
        }
    },
    dod: {
        type: Date,
        validate: {
            validator: function () {
                return new Date(this.dob).toISOString() <= new Date().toISOString()
            },
            message: function () {
                return "Invalid Date of Death"
            }
        }
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function () {
                return commonReg.email.test(this.email)
            },
            message: function () {
                return "Invalid Email"
            }
        }
    },
    tag: {
        type: [String],
        required: true,
        enum: ["actor", "director"]

    }
})


module.exports = mongoose.model("peoples", peopleSchema)