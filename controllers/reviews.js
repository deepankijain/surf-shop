const Post = require('../models/post');
const Review = require('../models/review');
module.exports = {

    // Reviews create
    async reviewCreate(req, res, next) {
        let post = await Post.findById(req.params.id).populate('reviews').exec();
        let haveReviewed = post.reviews.filter(review => {
            return review.author.equals(req.user._id);
        }).length;
        if (haveReviewed) {
            req.session.error = "You have already added a review. To change, please click on Edit!";
            return res.redirect(`/posts/${post.id}`)
        }
        //create review
        req.body.review.author = req.user._id;
        let review = await Review.create(req.body.review);

        await post.reviews.push(review);
        await post.save();
        console.log(post);
        req.session.success = 'Thanks for the feedback!';
        res.redirect(`/posts/${post.id}`);
    },
    //Reviews Update 
    async reviewUpdate(req, res, next) {
        await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
        req.session.success = 'Review updated!';
        res.redirect(`/posts/${req.params.id}`);
    },
    //Reviews Delete
    async reviewDelete(req, res, next) {
        await Post.findByIdAndUpdate(req.params.id, {
            $pull: {
                reviews: req.params.review_id
            }
        });
        await Review.findByIdAndRemove(req.params.review_id);
        req.session.success = 'Review deleted!';
        res.redirect(`/posts/${req.params.id}`);
    }
}