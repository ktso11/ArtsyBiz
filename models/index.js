var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/ArtsyBiza" );
mongoose.Promise = global.Promise;


module.exports.User = require("./user.js");
module.exports.Order = require("./order.js")
module.exports.Vendor = require("./vendor.js")
