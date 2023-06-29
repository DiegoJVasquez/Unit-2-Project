const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/', blogController.getAllBlogs)
router.post('/',blogController.createBlogs)
router.get('/:id',blogController.getABlogs )
router.put('/:id',blogController.updateBlogs )
router.delete('/:id',blogController.deleteBlogs)

module.exports = router
