const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Bookshelf = require('../models/Bookshelf');

// Route 1: Get all the books using: GET "/api/bookshelf/fetchallbooks". Login required
router.get('/fetchallbooks', fetchuser, async (req, res) => {
    try {
        const book = await Bookshelf.find({user: req.user.id});
        res.send(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a new book using: POST "/api/bookshelf/addbook". Login required
router.post('/addbook', fetchuser, [
    body('book_name', 'Enter a valid name').isLength({ min: 5 }),
    body('book_author', 'Enter a valid author').isLength({ min: 5 }),
    body('book_slug', 'Enter a valid slug').isLength({ min: 5 }),
    body('book_desc', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { book_name, book_author, book_slug, book_desc, book_img, book_price } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const book = new Bookshelf({
            book_name, book_author, book_slug, book_desc, book_img, book_price, user: req.user.id
        });
        const savedBook = await book.save();
        res.json(savedBook);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Update an existence book using: POST "/api/bookshelf/updatebook". Login required
router.put('/updatebook/:id', fetchuser, async (req, res) => {
    try {
        const { book_name, book_author, book_slug, book_desc, book_img, book_price } = req.body;
        // Create a newBook object
        const newBookPost = {};
        if(book_name){newBookPost.book_name = book_name};
        if(book_author){newBookPost.book_author = book_author};
        if(book_slug){newBookPost.book_slug = book_slug};
        if(book_desc){newBookPost.book_desc = book_desc};
        if(book_img){newBookPost.book_img = book_img};
        if(book_price){newBookPost.book_price = book_price};
        
        // Find the book to be updated and update it
        let book = await Bookshelf.findById(req.params.id);
        if(!book){return res.status(404).send("Not Found")};

        if(book.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        book = await Bookshelf.findByIdAndUpdate(req.params.id, {$set: newBookPost}, {new: true});
        res.json({book});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
});

// Route 4: Delete an existence book using: DELETE "/api/bookshelf/deletebook". Login required
router.delete('/deletebook/:id', fetchuser, async (req, res) => {
    try {
        // Find the book to be deleted and delete it
        let book = await Bookshelf.findById(req.params.id);
        if(!book){return res.status(404).send("Not Found")};

        if(book.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        book = await Bookshelf.findByIdAndDelete(req.params.id);
        res.json({"Success": "Book has been deleted", book: book});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
});

module.exports = router;