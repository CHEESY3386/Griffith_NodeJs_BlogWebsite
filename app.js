const express = require('express');
const userRouter = require('./routers/user.js');
const blogRouter = require('./routers/blog.js');

require('dotenv').config(); // so the app knows how to locate the .env file
require('./db/mongodb.js'); // connects to mongodb

// express app instance
const app = express();

// using...
app.use(express.json());
app.use(userRouter);
app.use(blogRouter);

// Run server
app.listen(process.env.PORT, () => {
    console.log('Server running on PORT : ' + process.env.PORT);
});