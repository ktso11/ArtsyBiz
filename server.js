var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var db = require("./models"),
    User = db.User
    Vendor = db.Vendor
// Configure app
app.set("views", __dirname + '/views');    // Views directory
app.use(express.static('public'));          // Static directory
app.use(bodyParser.urlencoded({ extended: true })); // req.body
app.set('view engine', 'ejs')
// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey', // change this!
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Passport Configure
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set CORS Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//ROUTES
app.get('/', function(req, res) {
 res.render("index", { user: req.user, });
});
app.get('/userlog', function(req, res) {
 res.render("userlog", { user: req.user, });
});
app.get('/vendorlog', function(req, res) {
 res.render("vendorlog", { user: req.user, });
});
app.get('/search', function(req, res) {
 res.render("search", { user: req.user, vendor: req.vendor, name: req.user.name });
});
//vendor signup
app.get('/partials/vendorsignup', function (req, res) {
 res.render('/partials/vendorsignup');
});
app.post('/partials/vendorsignup', function (req, res) {
  User.register(new User({ username: req.body.username, name: req.body.name, isVendor: req.body.isVendor }), req.body.password,
    function (err, newVendor) {
      passport.authenticate('local')(req, res, function() {
      res.redirect('/');;
      });
    }
  );
});
app.get('/partials/vendorlogin', function (req, res) {
 res.render('/partials/vendorlogin');
});

app.post('/partials/vendorlogin', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/search'); // sanity check
  // res.redirect('/'); // preferred!
});
//user signup
app.get('/partials/usersignup', function (req, res) {
 res.render('/partials/usersignup');
});

app.post('/partials/usersignup', function (req, res) {
  User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
      res.redirect('/search');;
      });
    }
  );
});

app.get('/partials/userlogin', function (req, res) {
 res.render('/partials/userlogin');
});

app.post('/partials/userlogin', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/search'); // sanity check
  // res.redirect('/'); // preferred!
});

app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});


app.listen(process.env.PORT || 8000, function () {
  console.log('Example app listening at http://localhost:8000/');
});
