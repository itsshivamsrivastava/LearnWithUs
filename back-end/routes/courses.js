const express = require('express');
const router = express.Router();
const Courses = require('../models/Courses');
const { validationResult } = require('express-validator');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '_' + uniqueSuffix + '.jpg')
    }
})
const upload = multer({ storage: storage })

// Route 1: Add new course using: POST "/api/courses/addcourse". No Login required
router.post('/addcourse', upload.single('thumbnail'), async (req, res) => {
    console.log(req, 12);
    try {
        const { courseId, courseTitle, courseDesc, courseContent, courseSlug, courseLink, courseNotesLink } = req.body;
        const thumbnail = req.file.path;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const course = new Courses({
            courseId, courseTitle, courseDesc, courseContent, courseSlug, courseLink, courseNotesLink, thumbnail
        });
        const savedCourse = await course.save();
        res.json(savedCourse);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Get all courses using: GET "/api/courses/getcourses". No Login required
router.get('/getcourses', async (req, res) => {
    try {
        const courses = await Courses.find();
        res.send(courses);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Get one course using: GET "/api/courses/getcourse/:slug". No Login required
router.get('/getcourse/:slug', async (req, res) => {
    try {
        const course = await Courses.findOne({ courseSlug: req.params.slug });
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.send(course);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Update a course using: PUT "/api/courses/updatecourse/:id". No Login required
router.put('/updatecourse/:urlCourseSlug', upload.single('thumbnail'), async (req, res) => {
    console.log(req, 67);
    try {
        const { courseId, courseTitle, courseDesc, courseContent, courseSlug, courseLink,courseNotesLink } = req.body;
        const thumbnail = req.file.path;
        const newCourse = {};
        if (courseId) newCourse.courseId = courseId;
        if (courseTitle) newCourse.courseTitle = courseTitle;
        if (courseDesc) newCourse.courseDesc = courseDesc;
        if (courseContent) newCourse.courseContent = courseContent;
        if (thumbnail) newCourse.thumbnail = thumbnail;
        if (courseSlug) newCourse.courseSlug = courseSlug;
        if (courseLink) newCourse.courseLink = courseLink;
        if (courseNotesLink) newCourse.courseNotesLink = courseNotesLink;

        // Find the course to be updated and update it
        let course = await Courses.findOne({ courseSlug: req.params.urlCourseSlug });
        if (!course) {
            return res.status(404).send("Course not found");
        }
        course = await Courses.findOneAndUpdate({ courseSlug: req.params.urlCourseSlug }, { $set: newCourse }, { new: true });
        res.json({ course });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 5: Delete a course using: DELETE "/api/courses/deletecourse/:id". No Login required
router.delete('/deletecourse/:urlCourseSlug', async (req, res) => {
    try {
        // Find the course to be deleted and delete it
        let course = await Courses.findOne({ courseSlug: req.params.urlCourseSlug });
        if (!course) {
            return res.status(404).send("Course not found");
        }
        course = await Courses.findOneAndDelete({ courseSlug: req.params.urlCourseSlug });
        res.json({ msg: "Course deleted successfully", course });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;