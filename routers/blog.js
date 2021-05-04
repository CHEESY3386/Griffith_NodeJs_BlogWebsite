const express = require('express');
const Post = require('../models/Post.js')
const auth = require('../middleware/auth.js')

const router = express.Router();

// Posts a new blog post 
router.post('/posts', auth, async(req, res) => {
    try {
        const post = new Post(req.body);
        
        await post.save();
        res.status(201).send({ post });
    } catch (error) {
        res.status(400).send(error);
    }
})

// Retrives posts with given params
router.get('/posts', auth, async (req, res) => {
    try {
        const posts = await Post.find(req.query.search_query);

        res.send({ posts });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Retrivies all of the users posts
router.get('/posts/me', auth, async (req, res) => {
    try {
        const posts = await Post.findByUserName(req.user.username);

        res.send({ posts });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/posts', auth, async(req, res) => {
    try {
        const { _id, header, content, img_url } = req.body;
        const post = await Post.findById(_id);

        post.header = header;
        post.content = content;
        post.img_url = img_url;
        await post.save();
        res.send({ post });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;