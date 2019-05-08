const express = require('express');
const server = express();

//ROUTER
const postRouter = require('./data/postRouter');

//MIDDLEWARE
const helmet = require('helmet');
const morgan = require('morgan');

//GLOBAL MIDDLEWARES
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));

//AUTOMATIC API URL EXTENSION
server.use('/api/posts', restricted, username, postRouter)

//SERVER HOMEPAGE
server.get('/', restricted, username, (req, res, next) => {
    res.send(`<h1>Server is alive</h1>`)
});

//ERROR HANDLER
server.use(errorHandler)

//AUTHORIZATION CHECK
function restricted( req, res, next ) {
    const password = req.headers.password;
    if ( password === 'test' ) {
        next();
    } else {
        res.status( 401 ).json({ message: 'Invalid Password Bro' })
    }
}

//ONLY USERNAME
// function only( name ) {
//     return function(req, res, next ) {
//         const usersName = req.headers.name
//         if ( usersName.toLowerCase() === name.toLowerCase() ) {
//             next();
//         } else {
//             res.status( 401 ).json({ message: 'Access Denied' })
//         }
//     }
// }


function username( req, res, next ) {
        const username = req.headers.name;
        if ( username === 'max' ) {
            next();
        } else if ( username !==' max' ) {
            res.status( 401 ).json({ message: 'Invalid Username Bro ' })
        }
    // }
}

//ERROR HANDLER
function errorHandler( error, req, res, next ) {
    res.status( 400 ).json({ message: 'ERR_RR_EE=EEE-R', error })
}

module.exports = server;