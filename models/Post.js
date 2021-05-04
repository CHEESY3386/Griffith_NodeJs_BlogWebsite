const mongoose = require('mongoose');

// Blog post schema
const postSchema = mongoose.Schema({
    postedby: {
        type: String,
        require: true,
        min: 1,
        max: 255
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
        require: false,
        min: 8,
        max: 255
    }
}, {
    timestamps: true,
    collection: 'posts'
});


// finds all posts with similar string in header or in content
postSchema.statics.findSimilar = async (search_query) => {
    const posts = await Post.find({
        header: new RegExp(search_query, 'i'),
        content: new RegExp(search_query, 'i')
    });

    return posts;
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
