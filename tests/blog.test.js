const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer}= require('mongodb-memory-server')
const app = require ('../app')
const server = app.listen(8081, () => console.log("TESTINNGGG ON 8081"))
const Blog = require ('../models/blog')
let mongoServer 

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create() // create a mongoMemory server before tests run
    await mongoose.connect(mongoServer.getUri()) // connecting database created above
})

afterEach(async () => {
    await Blog.deleteMany() // deletes everything from mongo memery server after each tests
})

afterAll(async () => {
    await mongoose.connection.close() // after all tests are finished, disconnect from mongo memory server
    mongoServer.stop() // stopping connectiong from mongo server
    server.close() //stops server
})

describe('testing all of the blog endpoints',() => {
   test('should create a new blog', async () => {
    const response = await request (app).post('/blogs').send() //
   })
})

test('should get a specific blog by id', async () => {
    const blog = new Blog({
        title: 'Do homework',
        description: 'finish your homework'
    }) 
    await blog.save()

    const response = await request(app).get(`/blogs/${blog._id}`)
    expect(response.statusCode).toBe(200)
})
