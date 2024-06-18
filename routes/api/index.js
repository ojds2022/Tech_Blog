const router = require('express').Router();
const blogPostsRoutes = require('./blog-posts-routes');

router.use('/blogPosts', blogPostsRoutes);

module.exports = router;