const mongoose = require('mongoose')
const {Schema} = mongoose

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog