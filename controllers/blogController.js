const Blog = require ('../models/blog')

exports.getAllBlogs = async (req, res) => {
    try {
        const blog = await Blog.find()
        res.json(blog)
    } catch (error) {
        res.status(400).json({message: error.message})
    } 
}

exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog(req.body)
        await blog.save()
        res.json({blog})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getBlog = async (req, res) => {
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
    res.status(400).json({message: error.message})
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findOne({_id: req.params.id}).deleteOne()
        res.json({message: "Blog Deleted"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
