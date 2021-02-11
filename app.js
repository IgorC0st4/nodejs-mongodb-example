const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
/* app.use('/posts', () => {
    console.log('Middleware');
});
 */

// CONNECT DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('connected to DB');
    }, (error) => {
        console.log(error);
    });


// IMPORT ROUTES
const postsRoute = require('./src/routes/posts');
app.use('/posts', postsRoute);


// ROUTES
app.get('/', (request, response) => {
    response.send('Home');
});

// LISTEN
const port = 8080;
app.listen(port);