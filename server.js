//SERVER ENDPOINTS\\

/* 

HOMEPAGE:
    / -purely asthetics


POSTS:
    /api/posts - see all posts
        -Delete
    /api/posts/:id -see individual posts by id
        -Update

USERS:
    /api/users - see all users
        -Add user
        -Delete
    /api/users/:id -see users by id
        -Update
    /api/users/:id/posts - see all posts by the user id
        -add posts using the user

*/


const express = require('express');
const server = express();

//ROUTER
const postRouter = require('./data/postRouter');
const userRouter = require('./data/userRouter');

//MIDDLEWARE
const helmet = require('helmet');
const morgan = require('morgan');

//GLOBAL MIDDLEWARES
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));

//AUTOMATIC API URL EXTENSION
server.use('/api/posts', restricted, postRouter);
server.use( '/api/users', restricted, userRouter );

//SERVER HOMEPAGE
server.get('/', restricted, username, (req, res, next) => {
    res.send(`<h1>Server is alive</h1>`)
});

//ERROR HANDLER
server.use(errorHandler)

//AUTHORIZATION CHECK PASSWORD
function restricted( req, res, next ) {
    const password = req.headers.password;
    if ( password === 'test' ) {
        next();
    } else {
        res.status( 401 ).json({ message: 'Invalid Password Bro' })
    }
}

//AUTHORIZATION CHECK USERNAME
function username( req, res, next ) {
        const username = req.headers.name;
        if ( username === 'max' ) {
            next();
        } else if ( username !==' max' ) {
            res.status( 401 ).json({ message: 'Invalid Username Bro' })
        }
    // }
}

//ERROR HANDLER
function errorHandler( error, req, res, next ) {
    res.status( 400 ).json({ message: 'ERR_RR_EE=EeE-Rr', error })
}

module.exports = server;