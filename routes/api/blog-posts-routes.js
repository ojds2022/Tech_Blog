const router = require('express').Router();
const { BlogPosts } = require('../../models');

// find all blog posts
router.get('/', async (req, res) => {
    try {
        const allBlogPostData = await BlogPosts.findAll();
        const blogPosts = allBlogPostData.map((blogPost) => blogPost.get({ plain: true }));
        res.json(blogPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});