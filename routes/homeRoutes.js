const router = require('express').Router();
const { BlogPosts } = require('../models');

// home page route
router.get('/', async (req, res) => {
    try {
        // fetch all blog post records from the BlogPosts table in the database
        const allBlogPostData = await BlogPosts.findAll();

        const dataReversed = allBlogPostData.slice().reverse(); // reverses the array of blog posts

        const topFourPosts = dataReversed.slice(0,4); // takes the four most recently created posts

        // convert each Sequelize model instance to a plain JavaScript object
        const blogPosts = topFourPosts.map((blogPost) => blogPost.get({ plain: true }));

        res.render('home', {
            title: 'Home Page',
            blogPosts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// dashboard route
router.get('/dashboard', async (req, res) => {
    try {
        // fetch all blog post records from the BlogPosts table in the database
        const allBlogPostData = await BlogPosts.findAll();

        const dataReversed = allBlogPostData.slice().reverse(); // reverses the array of blog posts

        const topEightPosts = dataReversed.slice(0,8); // takes the eight most recently created posts

        // convert each Sequelize model instance to a plain JavaScript object
        const blogPosts = topEightPosts.map((blogPost) => blogPost.get({ plain: true }));

        res.render('dashboard', {
            title: 'Dashboard',
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

        // save the inputData to the database
        await BlogPosts.create({ blog_header: newPostTitle, blog_content: newPostContent });

        res.json({ success: true, message: 'Data inserted successfully' });
    } catch (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json(err);
    }
});

// finds one post by its id and navigates users to the edit post page
router.get('/edit/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPosts.findOne(
            {
                where: { id: req.params.id },
            }
        );

        if (!blogPostData) {
            console.log('No post found with the given ID');
            return res.status(404).render('error', {
                title: 'Post Not Found',
                message: 'The post you are trying to edit does not exist.'
            });
        }
        
        const chosenPost = blogPostData.get({ plain: true });

        res.render('editPost', {
            title: 'Edit Post',
            chosenPost
        });
    } catch (err) {
        console.error('Error retrieving post:', err);
        res.status(500).json(err);
    }
});

// edit post when user clicks on 'update' button
router.put('/edit/:id', async (req, res) => {
try {
    const { editPostTitle, editPostContent } = req.body;

    if (!editPostTitle || !editPostContent) {
        return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    // update the data on the database
    const [updated] = await BlogPosts.update(
        { blog_header: editPostTitle, blog_content: editPostContent },
        { where: { id: req.params.id } }
    );

    if (updated) {
        res.json({ success: true, message: 'Data updated successfully' });
    } else {
        res.status(404).json({ success: false, message: 'Post not found' });
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update data' });
}
});

module.exports = router;