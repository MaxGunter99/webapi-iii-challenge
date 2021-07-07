const express = require('express');
const Posts = require('./helpers/postDb');
const router = express.Router();

//GETTING ALL POSTS
router.get( '/' , async ( req, res ) => {
    try {
        const posts = await Posts.get( req.query );
        res.status( 200 ).json( posts );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Error Getting Posts' });
    }
});

//RETRIEVING INDIVIDUAL POSTS
router.get( '/:id' , async ( req, res ) => {
    try {
        const post = await Posts.getById( req.params.id );
        if ( post ) {
            res.status( 200 ).json( post );
        } else {
            res.status( 404 ).json({ message: 'Post not found?' });
        }
    } catch {
        console.log( error );
        res.status( 500 ).json({ message: 'Error retrieving a Post' });
    }
});


//ADDING POSTS
router.post( '/' , async ( req, res ) => {
    console.log(req.body)
    try {
        const post = await Posts.insert( req.body );
        res.status( 201 ).json( post );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Error adding Post' });
    }
});

//DELETING POSTS
router.delete( '/:id' , async ( req, res ) => {
    try {
        const howMany = await Posts.remove( req.params.id );
        if ( howMany > 0 ) {
            res.status( 200 ).json({ message: 'Post has been abliterated ;)' });
        } else {
            res.status( 404 ).json({ message: 'Post is not found, cannot be abliterated :(' });
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Internal error abliterating' });
    }
});

//UPDATING POSTS
router.put( '/:id' , async ( req, res ) => {
    try {
        const post = await Posts.update( req.params.id, req.body );
        if ( post ) {
            res.status( 200 ).json( post );
        } else {
            res.status( 400 ).json({ message: 'Post cannot be found' });
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({ message: 'Error updating the Post' });
    }
});

module.exports = router;