const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Tutorials = require('../models/Tutorials');
const { validationResult } = require('express-validator');

// Route 1: Get all the tutorials using: GET "/api/tutorials/fetchtutorials". No Login required
router.get('/fetchtutorials', async (req, res) => {
    try {
        // const tutorial = await Tutorials.find({ user: req.user.id });
        const tutorial = await Tutorials.find();
        res.send(tutorial);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Get one tutorial using: GET "/api/tutorials/fetchtutorials/:slug". No Login required
router.get('/fetchtutorials/:slug', async (req, res) => {
    try {
        const tutorial = await Tutorials.find({ slug: req.params.slug });
        res.send(tutorial);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Get one tutorial using: GET "/api/tutorials/fetchtutorials/:id". No Login required
router.get('/fetchtutorials/:id', async (req, res) => {
    try {
        // const tutorial = await Tutorials.find({ user: req.user.id });
        const tutorial = await Tutorials.findById(req.params.id);
        res.send(tutorial);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Get all the tutorials using: GET "/api/tutorials/fetchalltutorials". Login required
router.get('/fetchalltutorials', fetchuser, async (req, res) => {
    try {
        const tutorial = await Tutorials.find({ user: req.user.id });
        res.send(tutorial);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Add a new tutorials using: POST "/api/tutorials/addtutorial". No Login required
router.post('/addtutorial', async (req, res) => {
    try {
        const { title, slug, content, tags, category, image } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const tutorial = new Tutorials({
            title, slug, content, tags, category, image
        });
        const savedTutorial = await tutorial.save();
        res.json(savedTutorial);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// Route 4: Update an existence tutorial using: PUT "/api/tutorials/updatetutorial". No Login required
router.put('/updatetutorial/:slug', async (req, res) => {
    try {
        const { title, slug, content, tags, category, image } = req.body;
        // Create a newTutorial object
        const newTutorial = {};
        if (title) { newTutorial.title = title };
        // if (subTitle) { newTutorial.subTitle = subTitle };
        if (slug) { newTutorial.slug = slug };
        if (content) { newTutorial.content = content };
        if (tags) { newTutorial.tags = tags };
        if (category) { newTutorial.category = category };
        if (image) { newTutorial.image = image };

        // Find the tutorial to be updated and update it
        let tutorial = await Tutorials.findOne({ slug: req.params.slug });
        if (!tutorial) {
            console.log("Not Found")
            return res.status(404).send("Not Found");
        }
        tutorial = await Tutorials.findOneAndUpdate({ slug: req.params.slug }, { $set: newTutorial }, { new: true });
        res.json({ tutorial });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 5: Delete an existence tutorial using: DELETE "/api/tutorials/deletetutorial". Login required
router.delete('/deletetutorial/:slug', async (req, res) => {
    try {
        // Find the tutorial to be delete and delete it
        let tutorial = await Tutorials.findOne({ slug: req.params.slug });
        if (!tutorial) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if user owns this tutorial
        // if (tutorial.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        tutorial = await Tutorials.findOneAndDelete({ slug: req.params.slug });
        res.json({ "Sucess": "Tutorial has been deleted", tutorial: tutorial });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;