const router = require('express').Router();
const { Users } = require('../../models');

// create a new user
router.post('/', async (req, res) => {
    try {
        const allUserData = await Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_address: req.body.email_address,
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            res.status(200).json(allUserData);
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const userData = await Users.findOne({ where: { username: req.body.username }});

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        // once the user successfully logs in, set up the sessions variable 'loggedIn' and allows us access to user_id of the user
        req.session.save(() => {
            req.session.loggedIn = true;
            req.sesssion.user_id = userData.user_id;
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// logout
router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});
  
  module.exports = router;