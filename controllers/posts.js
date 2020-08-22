const Post = require('../models/post');

module.exports = {
    //Post Index
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', {
            posts: posts
        });
    },
    //Post new
    postNew(req, res, next) {
        res.render('posts/new');
    },
    // Posts create
    async postCreate(req, res, next) {
        //use req.body to create new post
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    //Posts show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', {
            post
        });
    },
    // Posts Edit
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {
            post
        });
    },
    //Posts Update 
    async postUpdate(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    //Posts Delete
    async postDelete(req, res, next) {
        await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    }
}