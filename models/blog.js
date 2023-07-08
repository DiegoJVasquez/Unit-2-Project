const mongoose = require ('mongoose')
const app = require('../app')

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    complete: {type:Boolean, default: false}, 
    created_at: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}

})
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
