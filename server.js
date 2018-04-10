var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var db = require("./models"),
    User = db.User
    Order = db.Order
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
 res.render("search", { user: req.user });
});
app.get('/profile', function(req, res) {
 res.render("profile", { user: req.user });
});

app.get('/api/orders', function(req, res) {
  db.Order.find({}, function(err, order) {
    if (err) { cosole.error("Order not found")}
    res.json(order)
  })
})
//Create Orders
app.post('/api/orders', function (req, res) {
  console.log("Order request: " + req.body.user_id);
  db.User.findOne({_id: req.body.user_id}, function(err, userfound){
    if (err){
      console.error('not a real user!')
      res.status(400).json({error: "User not found."})
    }
    console.log('Found user:' + userfound)
    db.Order.create({
      rater_user: req.body.user_id,
      rated_vendor: req.body.vendor_id
    }, function(err, order) {
      if (err) {
        console.error("Error saving order.");
        res.status(400).json({error: err})
      } else {
        console.log(order);
        res.status(200).json(order);
      }
    });
  })
})

//GET Vendors
app.get('/api/vendors', function(req, res) {
  db.User.find().populate('')
  .exec(function(err, vendorlist) {
    if (err) { return console.log("index error: " + err); }
    res.json(vendorlist);
  });
})

app.get('/api/isvendor', function(req, res) {
  query = req.query.artist
  lquery = req.query.location
  db.User.find({isVendor: true, artist: query})
  .populate('')
  .exec(function (err, vendor) {
      res.json(vendor);
  });
})


//vendor signup
app.get('/partials/vendorsignup', function (req, res) {
 res.render('/partials/vendorsignup');
});
app.post('/partials/vendorsignup', function (req, res) {
  User.register(new User({
    username: req.body.username,
    name: req.body.name,
    isVendor: req.body.isVendor,
    artist: req.body.artist,
    location: req.body.location,
    rate: req.body.rate,
    picture: req.body.picture,
    email: req.body.email,
 }), req.body.password,
    function (err, newVendor) {
      // Vendor.create({
      //   user_id: newVendor._id
      // })
      passport.authenticate('local')(req, res, function() {
      res.redirect('/search');;
      });
    }
  );
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
  res.redirect('/search');
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
