var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
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
  isRated: {
      type: Boolean,
      default: "false"
    },
  rateValue: ['Number'],
});

var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
