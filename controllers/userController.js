require('dotenv').config()
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        if(!user){
            throw new Error('bad credentials')
        }
        req.user = user 
        next()
    } catch(error){
        res.status(401).json({ message: error.message })
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user, token })
    } catch (error) {
    res.status(400).json({ message: error.message })
 }
}

exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    updates.forEach((update) => (req.user[update] = req.body[update]))
    await req.user.save()
    res.json(req.user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


exports.getAUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        res.json({user})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
  

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).send("Invalid Credentials")
    } else {
      await user.save();
      res.json({message: "Logged In"})
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find()
      const loggedInUsers = users.map((user) => {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          loggedIn: user.loggedIn,
        }
      })
      res.json(loggedInUsers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne()
    res.json({ message: "User deleted" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.logoutUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).send("Invalid login credentials");
    } else {
      const token = await user.generateAuthToken();
      user.loggedIn = false
      await user.save()
      res.json({ message: "Logged Out" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


  exports.auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const data = jwt.verify(token, process.env.SECRET)
      const user = await User.findOne({ _id: data._id })
      if (!user) {
        throw new Error()
      }
      req.user = user
      next()
    } catch (error) {
      res.status(401).send('Not authorized')
    }
  }


