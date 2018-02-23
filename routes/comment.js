var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Idol    = require("../models/idol"),
    Comment = require("../models/comment");

//CREATE - add a new comment to db
router.post('/', function(req, res, next) {
    Idol.findById(req.params.id).populate("comments").exec(function(err, idol){
        if (err) return next(err);
        Comment.create(req.body.comment, function(err, comment){
            if (err) return next(err);
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            idol.comments.push(comment);
            idol.save();
            console.log(idol);
            res.json(idol);
        });
    });
});

//UPDATE - edit a comment in db
router.put('/:commentId', function(req, res, next) {
    Idol.findById(req.params.id).populate("comments").exec(function(err, idol){
        if (err) return next(err);
        Comment.findByIdAndUpdate(req.params.commentId, req.body.editcomment, function (err, comment) {
            if (err) return next(err);
            idol.save();
            console.log(idol);
            res.json(idol);
        });
    });
});

//DESTROY - delete a comment from db
router.delete('/:commentId', function(req, res, next) {
    Idol.findById(req.params.id).populate("comments").exec(function(err, idol){
        if (err) return next(err);
        Comment.findByIdAndRemove(req.params.commentId, function (err) {
            if (err) return next(err);
            idol.save();
            console.log(idol);
            res.json(idol);
        });
    });
});

module.exports = router;