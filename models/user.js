const { Schema, model } = require('mongoose')

const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    countryCode: {
        type: String,
        default: "+91"
    },

    password: {
        type: String,
        require: true,
        select: false
    },

    isCinemaAdmin: {
        type: Boolean,
        default: false
    }

})


module.exports = model("users", UserSchema)