var express = require("express"),
    router  = express.Router(),
    Idol = require("../models/idol"),
    middleware = require("../middleware");

var preAuthenticate = function (req,res,next){
    console.log(JSON.stringify(req.body));
    return next();
};

//IDOLS - get all idols
router.get("/", function(req, res, next){
    Idol.find({}, function(err, allIdols){
        if(err) return next(err);
        res.json(allIdols);
    });
});

//IDOL - get a single idol
router.get("/:id", function(req, res, next) {
  Idol.findById(req.params.id).populate("comments").exec(function(err, currentlyIdol){
    if (err) return next(err);
    console.log(currentlyIdol);
    res.json(currentlyIdol);
  });
});

//CREATE - add a new idol to db
router.post("/", preAuthenticate, middleware.isLoggedIn, function(req, res, next) {
  Idol.create(req.body.idol, function (err, newlyIdol) {
    if (err) return next(err);
    newlyIdol.author.id = req.user._id;
    newlyIdol.author.username = req.user.username;
    newlyIdol.save();
    console.log(newlyIdol);
    res.json(newlyIdol);
  });
});

//UPDATE - edit a idol in db
router.put("/:id", middleware.checkUserIdol, function(req, res, next) {
  Idol.findByIdAndUpdate(req.params.id, req.body.idol, function (err, idol) {
    if (err) return next(err);
    console.log(idol);
  });
});

//DESTROY - delete a idol from db
router.delete("/:id", middleware.checkUserIdol, function(req, res, next) {
  Idol.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
  });
});

module.exports = router;