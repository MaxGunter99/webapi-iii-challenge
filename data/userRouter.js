const express = require('express');
const Users = require('./helpers/userDb');
const router = express.Router();

//GETTING ALL USERS
router.get( '/' , async ( req, res ) => {
    try {
        const users = await Users.get( req.query );
        res.status( 200 ).json( users );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Error Getting Users' });
    }
});

//RETRIEVING INDIVIDUAL USERS
router.get( '/:id' , async ( req, res ) => {
    try {
        const user = await Users.getById( req.params.id );
        if ( user ) {
            res.status( 200 ).json( user );
        } else {
            res.status( 404 ).json({ message: 'User not found?' });
        }
    } catch {
        console.log( error );
        res.status( 500 ).json({ message: 'Error retrieving a User' });
    }
});

//GET USER POSTS
router.get( '/:id/posts' , async ( req, res ) => {
    try {
        const user = await Users.getUserPosts( req.params.id );
        if ( user ) {
            res.status( 200 ).json( user );
        } else {
            res.status( 404 ).json({ message: 'Users Posts not found?' });
        }
    } catch {
        console.log( error );
        res.status( 500 ).json({ message: 'Error retrieving a Users Posts' });
    }
});

//ADD A POST TO A USER
router.post('/:id/posts', async ( req, res ) => {
    const user = { ...req.body, user_id: req.params.id };
    console.log(user);
    try {
        const userMessage = await Users.addComment( user );
        res.status( 201 ).json( userMessage )
    } catch (error){
        console.log(error);
        res.status( 500 ).json({ message: 'Error adding message to User' })
    }
});

//ADDING USERS
router.post( '/' , async ( req, res ) => {
    try {
        const user = await Users.insert( req.body );
        res.status( 201 ).json( user );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Error adding User' });
    }
});

//DELETING USERS
router.delete( '/:id' , async ( req, res ) => {
    try {
        const howMany = await Users.remove( req.params.id );
        if ( howMany > 0 ) {
            res.status( 200 ).json({ message: 'User has been abliterated ;)' });
        } else {
            res.status( 404 ).json({ message: 'User is not found, cannot be abliterated :(' });
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Internal error abliterating' });
    }
});

//UPDATING USERS
router.put( '/:id' , async ( req, res ) => {
    try {
        const user = await Users.update( req.body );
        if ( user ) {
            res.status( 200 ).json( user );
        } else {
            res.status( 400 ).json({ message: 'User cannot be found' });
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Error updating the User' });
    }
});

module.exports = router;