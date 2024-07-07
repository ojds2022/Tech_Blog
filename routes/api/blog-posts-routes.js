const router = require('express').Router();
const { BlogPosts, Users } = require('../../models');

// find all blog posts
router.get('/', async (req, res) => {
    try {
        const allBlogPostData = await BlogPosts.findAll();

        // convert each Sequelize model instance to a plain JavaScript object
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
    // ensure the user is logged in
    if (!req.session.user_id) {
      res.status(401).json({ error: 'User not logged in' });
      return;
    }
    // fetch the user data to get the username
    const user = await Users.findByPk(req.session.user_id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    // create the new blog post with the user_id and username
    const createNewBlogPost = await BlogPosts.create({
      ...req.body,
      user_id: req.session.user_id,
      username: user.username,
    });

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