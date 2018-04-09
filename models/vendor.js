var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var VendorSchema = new Schema({
  username: String,
  password: String,
  name: String,
  artist: String,
  location: String,
  rate: String,
  picture: String
});

VendorSchema.plugin(passportLocalMongoose);

var Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor;
