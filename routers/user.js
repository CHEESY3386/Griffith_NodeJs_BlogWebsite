const express = require('express');
const User = require('../models/User.js')
const auth = require('../middleware/auth.js')

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();

        await user.save();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Gets user's info
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

//Login a registered user
router.post('/users/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();

        if (!user) {
            return res.status(401).send({error: 'Login failed'});
        }
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Log user out of the application
router.post('/users/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Log user out of all devices
router.post('/users/me/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete Account
router.delete('/users/me/', auth, async(req, res) => {
    try {
        const email = req.user.email;
    
        await req.user.deleteOne({email});
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
