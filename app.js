const express = require('express')
const morgan = require('morgan')
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/blogs', blogRoutes)
app.use('/users', userRoutes)

module.exports = app