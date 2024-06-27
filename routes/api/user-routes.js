const router = require('express').Router();
const { Users } = require('../../models');

// login route
router.post('/login', async (req, res) => {
    try {
        const userData = await Users.findOne({ where: { username: req.body.username } });
        console.log('req.body password: ', req.body.password);
        console.log('userData password: ', userData.password);

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        console.log('Password validation result: ', validPassword);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.user_id;
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to log in user' });
    }
});

// logout route
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
            req.session.user_id = allUserData.id;
            req.session.loggedIn = true;
            res.status(200).json(allUserData);
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});
  
  module.exports = router;