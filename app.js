// Setup NPM
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    logger          = require("morgan"),
    favicon         = require("serve-favicon"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    FacebookStrategy= require("passport-facebook").Strategy,
    flash           = require("connect-flash"),
    session         = require("express-session"),
    methodOverride  = require("method-override"),
    http            = require("http"),
    path            = require("path"),
    Idol        = require("./models/idol"),
    Comment     = require("./models/comment"),
    User        = require("./models/user");


// Requiring API routes
var idolRoutes = require("./routes/idol"),
    commentRoutes    = require("./routes/comment"),
    userRoutes      = require("./routes/user");

// Database setup
mongoose.connect("mongodb://localhost/bnk48");

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Setup https method
app.use(methodOverride('_method'));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "It is me",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done){ done(null, user) });
passport.deserializeUser(function(user, done){ done(null, user) });

// Set our api routes
app.use("/api", userRoutes);
app.use("/api/idols", idolRoutes);
app.use("/api/idols/:id/comments", commentRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`The BNK48APP Server Has Started!`));