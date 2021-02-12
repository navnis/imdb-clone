const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')

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

UserSchema.methods.generateAuthToken = function () {
    const { JWTKEY, TOKEN_EXPIRY } = process.env
    return jwt.sign({
        userId: this._id
    }, JWTKEY, { expiresIn: TOKEN_EXPIRY })
}


module.exports = model("users", UserSchema)