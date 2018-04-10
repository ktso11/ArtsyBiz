var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var VendorSchema = new Schema({
  user_id: string {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
});

VendorSchema.plugin(passportLocalMongoose);

var Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor;
