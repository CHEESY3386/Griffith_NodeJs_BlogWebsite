const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: userSchema,
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
}, {timestamps: true});

// finds all posts with given username
postSchema.statics.findByUserName = async (username) => {
    const posts = await post.user.find({username});

    return posts;
};

// finds all posts with similar string in header or in content
postSchema.statics.find = async (string) => {
    const posts = await post.find(
        {header : new RegExp(string, "i")},
        {content : new RegExp(string, "i")}
    );

    return posts;
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post