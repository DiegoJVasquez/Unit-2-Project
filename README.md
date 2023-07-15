Diego's Blog API Project Overview:

The purpose of this API is to enable users to create, search, and update blog posts. Authenticated users can perform these actions, and each blog post consists of a title and a post body. Additionally, users can retrieve and delete posts.

Prerequisites:

Nodemon
Node.js
MongoDB Atlas Database 
Open the terminal and run npm install -g nodemon
Getting Started:

Clone the repository to your local machine.
Install the necessary dependencies by running npm i (Node.js must be installed).
Create a .env file in the root directory.
To prevent sensitive data from being pushed to GitHub, add nodemodules/ and .env to the .gitignore file.
In the .env file, define variables for the MongoDB connection string and a SECRET variable with a hashed SHA password.
Blog API:

To start the API, run the command npm run dev, which will run on http://localhost:3000.
In the terminal, you should see the message "This demon is finally working in port 3000," indicating that the app is connected, and "Mongo freakin loves uss," indicating that the MongoDB database is connected.
API Requests in Postman:

Open the Postman app and ensure that your server is still running at http://localhost:3000.
Begin with a POST request to create a user. Set the Body tab to "raw" and select JSON format.
Use the provided endpoints in the routes folder to make requests for creating, retrieving, updating, and deleting posts.
Pay attention to routes that require authorization using a JSON Web Token (JWT).
Enter the required information in JSON object format.
Click "Send" to make the request.
Testing with Jest & Supertest:

Below I Have linked my Trello associated with this project
https://trello.com/b/NOmCFccP/blog-api
