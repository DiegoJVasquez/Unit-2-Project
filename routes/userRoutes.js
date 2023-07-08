const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/', userController.createUser) //create user
router.post('/login', userController.auth, userController.loginUser) //login a user
router.put('/:id', userController.auth, userController.updateUser) // update user
router.delete('/:id', userController.auth, userController.deleteUser) //delete user
router.get('/', userController.getAllUsers) //show users
router.get('/:id', userController.auth, userController.getAUser) // get specific user
router.post('/logout', userController.auth, userController.logoutUser) //logout user

module.exports = router