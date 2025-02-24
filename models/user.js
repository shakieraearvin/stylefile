const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  bodySize: {
    type: String,
  },
  bodyHeight: {
    type: String,
  },
  bodyWeight: {
    type: String,
  },
  bodyType: {
    type: String,
    enum: ['hourglass', 'rectangle', 'inverted triangle', 'pear', 'apple'],
  },
  itemName: {
    type: String,
    required: true,
  },
  itemSize: {
    type: String,
    required: true,
  },
  itemReview: {
    type: String,
  },
  itemLink: {
    type: String,
  },
  recommendation: {
    type: String,
    enum: ['purchase', 'do not purchase', 'still deciding'],
  },
  itemPicture: {
    type: String,
  },

});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
