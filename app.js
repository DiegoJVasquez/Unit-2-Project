const express = require('express')
const morgan = require('morgan')
const blogRoutes = require('./routes/blogRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/blogs', blogRoutes)

module.exports = app