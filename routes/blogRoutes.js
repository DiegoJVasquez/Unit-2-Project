const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/', blogController.getAllTBlogs)
router.post('/',blogController.createBlog)
router.get('/:id', blogController.getABlog )
router.put('/:id', blogController.updateBlog )
router.delete('/:id',blogController.deleteBlog)

module.exports = router