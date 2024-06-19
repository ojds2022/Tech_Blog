const router = require('express').Router();
const { BlogPosts } = require('../models');

// home page route
router.get('/', async (req, res) => {
    try {
        // fetch all blog post records from the BlogPosts table in the database
        const allBlogPostData = await BlogPosts.findAll();

        // convert each Sequelize model instance to a plain JavaScript object
        const blogPosts = allBlogPostData.map((blogPost) => blogPost.get({ plain: true }));

        res.render('home', {
            title: 'Home Page',
            blogPosts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// create new post route
router.post('/submit', async (req, res) => {
    try {
        const { newPostTitle, newPostContent } = req.body;

        if (!newPostTitle || !newPostContent) {
            return res.status(400).json({ success: false, message: 'Title and content are required' });
        }

        // Save the inputData to the database (assuming a model and database setup)
        await BlogPosts.create({ blog_header: newPostTitle, blog_content: newPostContent });

        res.json({ success: true, message: 'Data inserted successfully' });
    } catch (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json(err);
    }
});

// dashboard route
router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard', {
            title: 'Dashboard'
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;