const router = require('express').Router();

const blogPostsRoutes = require('./blog-posts-routes');
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);
router.use('/blogPosts', blogPostsRoutes);

module.exports = router;