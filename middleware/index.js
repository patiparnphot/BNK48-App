var Comment = require("../models/comment");
var Idol = require("../models/idol");
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/signin");
    },
    checkUserIdol: function(req, res, next){
        if(req.isAuthenticated()){
            Idol.findById(req.params.id, function(err, campground){
               if(campground.author.id.equals(req.user._id) || req.user.isAdmin){
                   next();
               } else {
                   res.redirect("/idols/" + req.params.id);
               }
            });
        } else {
            res.redirect("/signin");
        }
    },
    checkUserComment: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.commentId, function(err, comment){
               if(comment.author.id.equals(req.user._id) || req.user.isAdmin){
                   next();
               } else {
                   res.redirect("/idols/" + req.params.id);
               }
            });
        } else {
            res.redirect("/signin");
        }
    }
}