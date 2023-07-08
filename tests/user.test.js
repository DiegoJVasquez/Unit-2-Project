const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterEach(async () => {
    await User.deleteMany() // deletes everything from mongo memery server after each tests
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoServer.stop()
  server.close()
})

describe('Test the users endpoints', () => {
  test('It should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('John Doe')
    expect(response.body.user.email).toEqual('john.doe@example.com')
    expect(response.body).toHaveProperty('token')
  })

  test('It should login a user', async () => {
    const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    await user.save()

    const response = await request(app)
      .post('/users/login')
      .send({ email: 'john.doe@example.com', password: 'password123' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('John Doe')
    expect(response.body.user.email).toEqual('john.doe@example.com')
    expect(response.body).toHaveProperty('token')
  })

  test("It should update a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Jane Doe", email: "jane.doe@example.com" });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Jane Doe");
    expect(response.body.email).toEqual("jane.doe@example.com");
    await user.deleteOne();
  });

  test("It should delete a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("User deleted");
    await user.deleteOne();
  });

test("It should get and show all users", async () => {
    const user1 = new User({
      name: "Diego Vasquez",
      email: "dvasquez@fmail.com",
      password: "password123",
    });
    await user1.save();

    const user2 = new User({
      name: "Jake Carlson",
      email: "JCarl@fmail.com",
      password: "password123",
    });
    await user2.save();

    const user3 = new User({
      name: "Manuel Ventura",
      email: "MVen@fmail.com",
      password: "password123"
    });
    await user3.save();

    const response = await request(app).get("/users");
    console.log(response.body, "great job!");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
  });
});