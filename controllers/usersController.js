// require the Express module
const express = require('express');
// instantiate a router -- this will hold all the logic
// for the URLs + methods for this resource
const router = express.Router();
// import the user model
const User = require('../models/User');

// Add routes to the router object
// Index: GET all the bookmarks
router.get('/', async (req, res, next) => {
	// 1. Get all of the bookmarks from the DB
	try {
        const users = await User.find({})
        res.json(users)
    } catch (err) {
        next(err)
    }
});

// Show: Get a User by ID
router.get('/:id', async (req, res, next) => {
	try {
		// 1. Find the Bookmark by its unique ID
		const users = await User.findById(req.params.id);
		// 2. Send it back to the client as JSON
		// res.json(users);
        if (users) {
            res.json(users)
        } else {
            res.sendStatus(404)
        }
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		// 1. Use the data in the req body to create a new bookmark
		const newUser = await User.create(req.body);
		// 2. If the create is successful, send back the record that was inserted, specifying 201 status for Created
		res.status(201).json(newUser);
	} catch (err) {
		// 3. If there was an error, pass it on!
		next(err);
	}
});

module.exports=router