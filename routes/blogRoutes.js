const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const userController = require('../controllers/userController')

router.get('/', userController.auth, blogController.getAllBlogs) //show all blogs
router.post('/',userController.auth, blogController.createBlog) // create blog
router.get('/:id', userController.auth, blogController.getBlog ) // get specfic blog 
router.put('/:id', userController.auth, blogController.updateBlog) // update blog 
router.delete('/:id', userController.auth, blogController.deleteBlog) // delete blog

module.exports = router   