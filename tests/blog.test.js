const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer}= require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8050, () => console.log("TESTINNGGG ON 8050"))
const Blog = require('../models/blog')
const User = require('../models/user')
let mongoServer 

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create() // create a mongoMemory server before tests run
    await mongoose.connect(mongoServer.getUri()) // connecting database created above
})

afterEach(async () => {
    await Blog.deleteMany() // deletes everything from mongo memery server after each tests
    await User.deleteMany() // deletes user after each test
})

afterAll(async () => {
    await mongoose.connection.close() // after all tests are finished, disconnect from mongo memory server
    mongoServer.stop() // stopping connectiong from mongo server
    server.close() //stops server
})

describe("Test the blog endpoints", () => {
    test("It should create a new blog", async () => {
        const user = new User({
            name: "John Doe",
            email: "john.doe@fmail.com",
            username: "JohnDoe1",
            password: "password123"
        })
        await user.save();
        const token = await user.generateAuthToken();

        const response = await request(app)
        .post("/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send({
         title: "First blog, im excited",
         blogbody: "We're doing it!!"
        })
  
      expect(response.statusCode).toBe(200);
      console.log(response.body, "this DOESN'T wanna work")
    })

    test("It should get and show all posts", async () => {
        const user = new User({
            name: "John Doe",
            email: "john.doe@fmail.com",
            username: "JohnDoe1",
            password: "password123",
        })
        const blog1 = new Blog({ // post instance 1
          title: "rating movies",
          blogbody: "Horror movies are the best genre"
        })
        await blog1.save();
    
        const blog2 = new Blog({
          title: "rating songs",
          blogbody: "RnB is the best genre of music"
        })
        await blog2.save();
    
        const blog3 = new Blog({
          title: "rating food",
          blogbody: "Mexican food is the best food"
        })
        await blog3.save();
        await user.save();

        const token = await user.generateAuthToken();

        const response = await request(app)
          .get('/blogs')
          .set("Authorization", `Bearer ${token}`);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
      });

    
    test("It should delete a blog", async () => {
        const user = new User({
            name: "John Doe",
            email: "john.doe@fmail.com",
            username: "JohnDoe1",
            password: "password123",
        });
        const blog = new Blog({
          title: "deleted",
          blogbody: "this blog was made to be deleted"
        });
        await user.save();
        const token = await user.generateAuthToken();
    
        const response = await request(app)
          .delete(`/blogs/${user._id}`)
          .set("Authorization", `Bearer ${token}`);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("blog deleted");
        await blog.deleteOne();
      });


    test("It should get a specific blog", async () => {
        const user = new User({
                name: "John Doe",
                email: "john.doe@fmail.com",
                username: "JohnDoe1",
                password: "password123",
            })
        const blog1 = new Blog({ // post instance 1
          title: "rating movies",
          postbody: "Horror movies are the best genre"
        });
        await user.save()
        const token = await user.generateAuthToken();


        const response = await request(app)
          .get(`/blogs/${user._id}`)
          .set("Authorization", `Bearer ${token}`);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject;
    });
});