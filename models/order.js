var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // passportLocalMongoose = require('passport-local-mongoose');
    User = require('./user')
    Vendor = require('./vendor')

var OrderSchema = new Schema({
  rater_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  rated_vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },

  rateValue: []
});

// OrderSchema.plugin(passportLocalMongoose);

var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
