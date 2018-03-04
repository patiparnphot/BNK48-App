var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    async       = require("async"),
    nodeMailer  = require("nodemailer"),
    crypto      = require("crypto"),
    multer      = require("multer"),
    request     = require('request'),
    mongoose    = require('mongoose'),
    Idol    = require("../models/idol"),
    User    = require("../models/user");
    

var smtpTransport = nodeMailer.createTransport({
               service: "Gmail",
               auth: {
                       user: "patiparnair@gmail.com",
                       pass: "15111994",
               }
            });

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: "dlaelxhbp", 
  api_key: "492524649579695", 
  api_secret: "c1hU9DtqLmmPHsvn0k6kqZBrZKc"
});

var preAuthenticate = function (req,res,next){
    console.log(JSON.stringify(req.body));
    return next();
};

router.post("/upload", function(req, res, next){
    console.log("you have entered api but not cloundinary yet");
    var upload = "data:" + req.body.filetype + ";base64," + req.body.value;
    cloudinary.uploader.upload(upload, function(result) {
        console.log(result);
        res.json(result);
    });
});

//REGISTER - add new user to db
router.post("/register", preAuthenticate, function(req, res, next){
    var newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        avatar: req.body.avatar
    });
    if(req.body.admincode === "amnotgonnatellu"){
        newUser.isAdmin = true;
    };
    User.register(newUser, req.body.password, function(err,user){
        if(err) return next(err);
        passport.authenticate("local")(req, res, function(){
            console.log(req.user);
            res.json(req.user);
        });
    });
});

//SIGNIN - matching data and user db
router.post("/login", preAuthenticate, passport.authenticate("local"), function(req, res){
    console.log(req.user);
    res.json(req.user);
});

//LOGOUT - delete user out of session
router.get("/logout", function(req, res){
    console.log(req.user);
    req.logout();
    console.log("I log you out!!!");
});

//FORGOT - create token and send token to client email
router.post("/forgot", preAuthenticate, function(req, res, next){
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buff){
                var token = buff.toString("hex");
                done(err, token);
            }); 
        },
        function(token, done){
            User.findOne({ email: req.body.email }, function(err, user){
                if(!user) return res.send("No account with that email address exists.");
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                user.save(function(err){
                    done(err, token, user); 
                });
            });
        },
        function(token, user, done){
            var mailOptions = {
                to: user.email,
                from: "patiparnair@gmail.com",
                subject: "BNK48APP Password Reset",
                text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
                    "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
                    "http://" + req.headers.host + "/reset/" + token + "\n\n" +
                    "If you did not request this, please ignore this email and your password will remain unchanged.\n"
            };
            smtpTransport.sendMail(mailOptions, function(err){
                console.log("mail sent");
                res.send("An email have been sent to " + user.email + " with further instuctions.");
                done(err, "done");
            });
        }
    ], function(err){
        if(err) return next(err);
    });
});

//RESET - change password and send confirm message to client email
router.post("/reset/:token", preAuthenticate, function(req, res, next){
    async.waterfall([
        function(done){
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user){
                if(!user) return res.send("Password reset token is invalid or has expired.");
                if(req.body.password === req.body.confirm){
                    user.setPassword(req.body.password, function(err){
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                        user.save(function(err){
                            req.logIn(user, function(err){
                                done(err, user);
                            });
                        });
                    });
                } else {
                    return res.send("Passwords do not match.");
                }
            });
        },
        function(user, done){
            var mailOptions = {
                to: user.email,
                from: "patiparnair@gmail.com",
                subject: "Your password have been changed",
                text: "Hello,\n\n" +
                    "This is a confirmation that the password for your account " + user.email + " has just been changed.\n"
            };
            smtpTransport.sendMail(mailOptions, function(err){
                res.send("Successfully changed your password!!!");
                done(err);
            });
        }
    ], function(err){
        if(err) return next(err);
    });
});


//USER - get a user profile
router.post("/users/:authorId", function(req, res, next) {
    console.log(JSON.stringify(req.params));
    User.findById(req.params.authorId, function(err, authorUser){
        if (err) return next(err);
        Idol.find().where("author.username").equals(authorUser.username).exec(function(err, yourIdol){
            if (err) return next(err);
            var userProfile = {
                user: authorUser,
                idols: yourIdol
            };
            res.json(userProfile)
        });
    });
});

module.exports = router;