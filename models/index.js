var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/ArtsyBiz" );
mongoose.Promise = global.Promise;


module.exports.User = require("./user.js");
module.exports.Vendor = require("./vendor.js")
