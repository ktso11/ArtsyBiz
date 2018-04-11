var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user')

var VendorSchema = new Schema({
  user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
});



var Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor;
