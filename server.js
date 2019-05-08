const express = require('express');
const server = express();

//ROUTERS
const userRouter = require('./data/helpers/userRouter');
const postRouter = require('./data/helpers/postRouter');

//MIDDLEWARE
const helmet = require('helmet');
const morgan = require('morgan');

//GLOBAL MIDDLEWARES
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));

//SERVER HOMEPAGE
server.get('/', (req, res, next) => {
    res.send(`<h1>Server is alive</h1>`)
});

module.exports = server;