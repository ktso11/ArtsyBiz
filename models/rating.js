var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var RatingSchema = new Schema({
  rater_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  rated_vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  rateValue: []
});

RatingSchema.plugin(passportLocalMongoose);

var Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;
