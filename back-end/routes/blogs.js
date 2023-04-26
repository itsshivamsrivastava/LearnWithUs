const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Blogs = require('../models/Blogs');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the blogs using: GET "/api/blogs/fetchallblogs". Login required
router.get('/fetchallblogs', async (req, res) => {
    try {
        // const blog = await Blogs.find({user: req.user.id});
        const blog = await Blogs.find();
        res.send(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Get all the blogs for perticular user using: GET "/api/blogs/fetchalluserblogs". Login required
router.get('/fetchalluserblogs', fetchuser, async (req, res) => {
    try {
        const blog = await Blogs.find({user: req.user.id});
        // const blog = await Blogs.find();
        res.send(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Add a new blog using: POST "/api/blogs/addblog". Login required
router.post('/addblog', fetchuser, [
    body('blog_title', 'Enter a valid title').isLength({ min: 5 }),
    body('blog_subTitle', 'Enter a valid subTitle').isLength({ min: 5 }),
    body('blog_slug', 'Enter a valid slug').isLength({ min: 5 }),
    body('blog_content', 'Enter a valid content').isLength({ min: 5 })
], async (req, res) => {
    try {
        // Destructuring the request body
        const { blog_title, blog_subTitle, blog_slug, blog_content } = req.body; 
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const blog = new Blogs({
            blog_title, blog_subTitle, blog_slug, blog_content, user: req.user.id
        });
        const savedBlog = await blog.save();
        res.json(savedBlog);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Update an existence blog using: POST "/api/blogs/updateblog". Login required
router.put('/updateblog/:id', fetchuser, async (req, res) => {
    try {
        // Destructuring the request body
        const { blog_title, blog_subTitle, blog_slug, blog_content } = req.body;
        // Create a newBlog object
        const newBlogPost = {};
        if(blog_title){newBlogPost.blog_title = blog_title};
        if(blog_subTitle){newBlogPost.blog_subTitle = blog_subTitle};
        if(blog_slug){newBlogPost.blog_slug = blog_slug};
        if(blog_content){newBlogPost.blog_content = blog_content};

        // Find the blog to be updated and update it
        let blogPost = await Blogs.findById(req.params.id);
        if(!blogPost){
            return res.status(404).send("Not Found");
        }
        if(blogPost.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        blogPost = await Blogs.findByIdAndUpdate(req.params.id, {$set: newBlogPost}, {new: true});
        res.json({blogPost});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
        
// Route 5: Delete an existence blog using: DELETE "/api/blogs/deleteblog". Login required
router.delete('/deleteblog/:id', fetchuser, async (req, res) => {
    try {
        // Delete the blog to be delete and delete it
        let blogPost = await Blogs.findById(req.params.id);
        if(!blogPost){
            return res.status(404).send("Not Found");
        }
        if(blogPost.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        blogPost = await Blogs.findByIdAndDelete(req.params.id);
        res.json({"Success": "Blog has been deleted", blogPost: blogPost});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;