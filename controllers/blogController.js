const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getAllBlogs = async (req, res) => {
    try{
      const blogs = await Blog.find({})
      res.json(blogs)  
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.createBlog = async (req, res) => {
    try{
        const blogData = req.body
        const user = await req.user
        if (!req.user) {
            throw new Error({message: "user not found"})
        } else {
            const newBlog = await Blog.create(blogData)
            await newBlog.save()
            user.blogs.addToSet(newBlog)
            await user.save()
            res.json(user)
        }
    } catch (error) {
        res.status(403).json({message: error.message})
    }
}

exports.getABlog = async (req, res) => {
try{
    const blog = await Blog.findOne({_id: req.params.id})
    res.json(blog)
} catch (error) {
    res.status(400).json({message: error.message})
   }
}

exports.updateBlog = async (req, res) => {
    try{
    const updates = Object.keys(req.body)
    const blog = await Blog.findOne({_id: req.params.id})
    updates.forEach((update) => {blog[update] = req.body[update]})
    await blog.save()
    res.json(blog)
}catch (error) {
    res.status(401).json({message: error.message})
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.deleteOne({_id:req.params.id})
        res.json({message: "blog deleted"})
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}
