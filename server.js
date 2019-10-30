var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    methodOverride = require('method-override')
var db = require("./models"),
    User = db.User
    Order = db.Order
    Vendor = db.Vendor

// Configure app
app.set("views", __dirname + '/views');    // Views directory
app.use(express.static('public'));          // Static directory
app.use(bodyParser.urlencoded({ extended: true })); // req.body
app.set('view engine', 'ejs')
app.use(methodOverride('X-HTTP-Method-Override'))
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
app.get('/thanks', function(req, res) {
 res.render("thanks", { user: req.user, });
});



app.get('/api/order', function(req, res) {
  db.Order.find({}, function(err, order) {
    if (err) { cosole.error("Order not found")}
    res.json(order)
  })
})


app.put('/api/userorder/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('req.param: ' +req.params.id);
  // console.log('body is', req.body);]
  var id= req.params.id
  var rating = req.body.rateValue; //ref html on input
//   db.Order.findOne({_id: id }, function(err, order) {
//     if (err) { console.error(err) }
//     console.log('look here' + order.rated_vendor.user_id)
//
//     order.isRated = true
//     // order.rated_vendor.user_id.rating.push(rating)
//     order.save()
//     res.json(order)
//   })
// })
//remove
  db.Order.findOne({_id:id}).populate({
    path: 'rated_vendor',
    populate: { path: 'user_id'}
  })
  .exec(function(err,found){
      found.isRated = true;
      console.log("found.isRated" + found)
      // found.rated_vendor.user_id.rating.push(rating)
      found.save(function(err,saved){
        saved.rated_vendor.user_id.rating.push(rating)
        saved.rated_vendor.user_id.save()
        res.json(saved);
      })
    })
  })



//api/user:id/orders
// Flitering Orders
app.get('/api/userorder/', function(req, res) {
  db.Order.find({rater_user: req.user._id, isRated: false}).populate({
    path: 'rated_vendor',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'user_id' }
  })
.exec(
    function(err, orderlist) {
    if (err) {
      console.error("user not found")
  } else {
    // console.log('this user is found on order list' + orderlist)
    res.status(200).json(orderlist);
  }
  })
})
//testing id
app.get('/api/userorder/:id', function (req, res) {
  db.Order.findOne({_id: req.params.id
  }, function(err, data) {
    res.json(data);
  });
});


//Create Orders
app.post('/api/orders', function (req, res) {
  console.log("Order request: " + req.body.user_id);
  db.Vendor.findOne({user_id: req.body.vendor_id}, function(err, userfound){
    if (err){
      console.error('not a real user!')
      res.status(400).json({error: "User not found."})
    } else {
      console.log('Found user:' + userfound)
      db.Order.create({
        rater_user: req.body.user_id,
        rated_vendor: userfound._id
      }, function(err, order) {
        if (err) {
          console.error("Error saving order.");
          res.status(400).json({error: err})
        } else {
          console.log(order);
          res.redirect('/thanks');
        }
      });
    }
  })
})

//GET Vendors
app.get('/api/vendors/:id', function(req, res) {
  db.Vendor.find().populate('')
  .exec(function(err, vendorlist) {
    if (err) { return console.log("index error: " + err); }
    res.json(vendorlist);
  });
})

app.get('/api/isvendor', function(req, res) {
  query = req.query.artist
  // lquery = req.query.location
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
 //creating a vendor_id
    function (err, newVendor) {
      Vendor.create({
        user_id: newVendor._id
      })
      console.log("created")
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
