const express = require('express');
const Post = require('../models/Post.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

// Posts a new blog post 
router.post('/api/posts', auth, async(req, res) => {
    try {
        const post = new Post({
            postedby: req.user.username,
            header: req.body.header,
            content: req.body.content,
            img_url: req.body.img_url,
        });

        await post.save();
        res.status(201).send({ post });
    } catch (error) {
        res.status(400).send(error);
    }
})

// Retrives posts with given params
router.get('/api/posts', auth, async (req, res) => {
    try {
        let posts;

        if (req.query.search_query) {
            posts = await Post.findSimilar(req.query.search_query);
        } else {
            posts = await Post.find();
        }
        posts = posts.slice(0, 9);
        res.send({ posts });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Retrivies all of the users posts
router.get('/api/posts/me', auth, async (req, res) => {
    try {
        const postedby = req.user.username;
        const posts = await Post.find({postedby});

        res.send({ posts });
    } catch (error) {
        res.status(400).send(error);
    }
});

// modifies the users chosen post
router.put('/api/posts', auth, async(req, res) => {
    try {
        const { _id, header, content, img_url } = req.body;
        const postedby = req.user.username;
        const posts = await Post.find({postedby});
        const post = await posts.find(element => element._id == _id);

        if (post) {
            post.header = header;
            post.content = content;
            post.img_url = img_url;
            await post.save();
            res.send({ post });
        } else {
            res.status(400).send({error : "Could not find post"});
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;