var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  isVendor: Boolean,
  artist: String,
  location: String,
  rate: String,
  picture: String,
  email: String,
  rating: {
    type: [Number],
    'default':5
  }

});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;
