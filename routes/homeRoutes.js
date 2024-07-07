const router = require('express').Router();
const { BlogPosts, Users } = require('../models');
const withAuth = require('../utils/auth');

// login route
router.get('/login', (req, res) => {
    // if the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // otherwise, render the login page
    res.render('login');
});

// logout route
router.get('/logout', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.redirect('/');
});

// register new user route
router.get('/signup', (req, res) => {
    res.render('signup');
});

// home page route
router.get('/', async (req, res) => {
    try {
        const allUsersData = await Users.findAll();
        
        const allBlogPostData = await BlogPosts.findAll();

        const dataReversed = allBlogPostData.slice().reverse(); // reverses the array of blog posts

        const topFourPosts = dataReversed.slice(0,4); // takes the four most recently created posts

        // convert each Sequelize model instance to a plain JavaScript object
        const users = allUsersData.map((user) => user.get({ plain: true }));
        const blogPosts = topFourPosts.map((blogPost) => blogPost.get({ plain: true }));

        res.render('home', {
            title: 'Home Page',
            users,
            blogPosts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// when a user clicks on a blog post on the homepage, it gives them a more detailed look at it and allows them to leave a comment
router.get('/blogPost/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPosts.findOne({ where: { id: req.params.id } });

        if (!blogPostData) {
            console.log('No post found with the given ID');
            return res.status(404).render('error', {
                title: 'Post Not Found',
                message: 'The post you are trying to select does not exist.'
            });
        }
        
        const chosenPost = blogPostData.get({ plain: true });

        res.render('selectPost', {
            title: 'Select Post',
            chosenPost,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.error('Error retrieving post:', err);
        res.status(500).json(err);
    }
});

// dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // fetch all users data from the Users table in the database
        const allUsersData = await Users.findAll();

        // convert each Sequelize model instance to a plain JavaScript object
        const users = allUsersData.map((user) => user.get({ plain: true }));

        // fetch all blog post data with the user's id
        const allBlogPostData = await BlogPosts.findAll({ where: { user_id: req.session.user_id} });

        let blogPosts = [];

        if (allBlogPostData.length > 0) {
            const dataReversed = allBlogPostData.slice().reverse(); // reverses the array of blog posts
            const topEightPosts = dataReversed.slice(0,8); // takes the eight most recently created posts
            blogPosts = topEightPosts.map((blogPost) => blogPost.get({ plain: true }));
        }

        res.render('dashboard', {
            title: 'Dashboard',
            users,
            blogPosts,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        });
    } catch (err) {
        console.error('Failed to open dashboard', err);
        res.status(500).json(err);
    }
});

// create new post route
router.post('/submit', withAuth, async (req, res) => {
    try {
        const { newPostTitle, newPostContent } = req.body;
        const userId = req.session.user_id;

        if (!newPostTitle || !newPostContent) {
            return res.status(400).json({ success: false, message: 'Title and content are required' });
        }

        // save the inputData to the database
        await BlogPosts.create({ blog_header: newPostTitle, blog_content: newPostContent, user_id: userId });

        res.json({ success: true, message: 'Data inserted successfully' });
    } catch (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json(err);
    }
});

// finds one post by its id and navigates users to the edit post page
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPosts.findOne({ where: { id: req.params.id } });

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
            chosenPost,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.error('Error retrieving post:', err);
        res.status(500).json(err);
    }
});

// edit post when user clicks on 'update' button
router.put('/update/:id', withAuth, async (req, res) => {
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

router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        const deleteBlogPost = await BlogPosts.destroy({ where: { id: req.params.id } });

        if (deleteBlogPost) {
            res.json({ success: true, message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Post was not deleted successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete data' });
    }
});

module.exports = router;