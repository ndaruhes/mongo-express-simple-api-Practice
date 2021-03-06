const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String
}, {timestamps: true})

userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, 10, null)
}

const User = mongoose.model('User', userSchema)
module.exports = User

