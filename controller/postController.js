const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const posts = require('../models/posts');

exports.get_posts = asyncHandler(async (req, res, next) => {
    const post = await posts.find({published: true}).populate("user").exec();

    return res.json(post);
});

exports.get_user_posts = asyncHandler(async (req, res, next) => {
    const post = await posts.find({user: req.params.id}).populate("user").exec();

    return res.json(post);
});

exports.post_post = asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);

    const post = new posts({
        user: req.body.user,
        title: req.body.title,
        content: req.body.content,
        date: Date.now(),
        published: req.body.published,
        });

    if(!errors.isEmpty()){
        return console.log(errors);
    } else {
        await post.save();
    };
});

exports.update_post = asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);

    const post = new posts({
        user: req.body.user,
        title: req.body.title,
        content: req.body.content,
        date: Date.now(),
        published: req.body.published,
        _id: req.params.id

        });

    if(!errors.isEmpty()){
        return console.log(errors);
    } else {
        return await posts.findByIdAndUpdate(req.params.id, post, {});
    };
});

exports.post_delete_post = asyncHandler(async (req, res, next) => {
    const post = await posts.findById(req.params.id).populate("user").exec();

    await posts.findByIdAndDelete(req.params.id);
});

exports.get_single_post = asyncHandler(async (req, res, next) => {
    const singlePost = await posts.findById(req.params.id).populate("user").exec();

    return res.json(singlePost);
});