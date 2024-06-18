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

// find one blog by its id value
router.get('/:id', async (req, res) => {
    try {
      const blogPostData = await BlogPosts.findOne(
        {
          where: { id: req.params.id },
        }
      );
      const result = blogPostData.get({ plain: true });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  // create a new blog post
  router.post('/', async (req, res) => {
    try {
      const createNewBlogPost = await BlogPosts.create(req.body);
      res.json(createNewBlogPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create new blog post' });
    }
  });

  // update a blog post by its id value
  router.put('/:id', async (req, res) => {
    try {
      const updateBlogPost = await BlogPosts.update(
        req.body,
        { where: { id: req.params.id } }
      );
      res.json(updateBlogPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  });

  // delete a blog post by its id value
  router.delete('/:id', async (req, res) => {
    try {
      const deleteBlogPost = await BlogPosts.destroy(
        { where: { id: req.params.id } }
      );
      res.json(deleteBlogPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  });

module.exports = router;