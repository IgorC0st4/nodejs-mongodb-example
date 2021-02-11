const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// LIST ALL
router.get('/', async (request, response) => {
    try {
        const posts = await Post.find();
        response.json(posts);
    } catch (error) {
        response.json({ message: error });
    }
});

// NEW
router.post('/', async (request, response) => {
    const post = new Post({
        title: request.body.title,
        description: request.body.description
    });

    try {
        const savedPost = await post.save();
        response.json(savedPost);
    } catch (error) {
        response.json({ message: error })
    }
});

// GET SPECIFIC
router.get('/:postId', async (request, response) => {
    try {
        const post = await Post.findById(request.params.postId);
        response.json(post);
    } catch (error) {
        response.json({ message: error });
    }
});


// DELETE
router.delete('/:postId', async (request, response) => {
    try {
        const removedPost = await Post.remove({ _id: request.params.postId });
        response.json(removedPost);
    } catch (error) {
        response.json({ message: error });
    }
});

// UPDATE
router.patch('/:postId', async (request, response) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: request.params.postId },
            { $set: { title: request.body.title } }
        );
        response.json(updatedPost);
    } catch (error) {
        response.json({ message: error });
    }
});
module.exports = router;