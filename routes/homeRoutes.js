const router = require('express').Router();
const { BlogPosts } = require('../models');

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

module.exports = router;