const mongoose = require('mongoose');
const User = require('./User.js')

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    header: {
        type: String,
        require: true,
        min: 1,
        max: 255
    },
    content: {
        type: String,
        require: true,
        min: 0,
        max: 4294967295
    },
    img_url: {
        type: String,
        require: true,
        min: 8,
        max: 255
    }
}, {
    timestamps: true,
    collection: 'posts'
});

// finds all posts with given username
postSchema.methods.findByUserName = async (username) => {
    const posts = await post.user.find({username});

    return posts;
};

// finds post by id
postSchema.methods.findById = async (id) => {
    const post = await post.user.findById(id);

    return post;
};

// finds all posts with similar string in header or in content
postSchema.methods.find = async (string) => {
    const posts = await post.find(
        {header : new RegExp(string, "i")},
        {content : new RegExp(string, "i")}
    );

    return posts;
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
