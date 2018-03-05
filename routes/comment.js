var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Idol    = require("../models/idol"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

//CREATE - add a new comment to db
router.post('/', middleware.isLoggedIn, function(req, res, next) {
    var newcomment = { text: req.body.text };
    Idol.findById(req.params.id).populate("comments").exec(function(err, idol){
        if (err) return next(err);
        Comment.create(newcomment, function(err, comment){
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
router.put('/:commentId', middleware.checkUserComment, function(req, res, next) {
    var updatecomment = { text: req.body.text };
    Comment.findByIdAndUpdate(req.params.commentId, updatecomment, function (err, comment) {
        if (err) return next(err);
        comment.save();
        Idol.findById(req.params.id).populate("comments").exec(function(err, idol){
        if (err) return next(err);
            idol.save();
            console.log(idol);
            res.json(idol);
        });
    });
});

//DESTROY - delete a comment from db
router.delete('/:commentId', middleware.checkUserComment, function(req, res, next) {
    Comment.findByIdAndRemove(req.params.commentId, function (err) {
        if (err) return next(err);
        Idol.findById(req.params.id).populate("comments").exec(function(err, idol){
        if (err) return next(err);
            idol.save();
            console.log(idol);
            res.json(idol);
        });
    });
});

module.exports = router;