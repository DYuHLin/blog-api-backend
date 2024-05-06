const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const comments = require('../models/comments');
const mongoose = require('mongoose');

exports.get_comments = asyncHandler(async (req, res, next) => {
    const comment = await comments.find({post: req.params.id}).populate("user").populate("post").exec();

    return res.json(comment);
});

exports.post_comment = asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);

    const comment = new comments({
        user: req.body.user,
        post: req.body.post,
        content: req.body.content,
        date: Date.now()
        });

    if(!errors.isEmpty()){
        return console.log(errors);
    } else {
        await comment.save();
    };
});

exports.post_delete_comment = asyncHandler(async (req, res, next) => {
    const post = await comments.findById(req.body.id).populate("user").populate("post").exec();

    await comments.findByIdAndDelete(req.params.id);
});