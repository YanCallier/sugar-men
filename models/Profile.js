const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'friends'
  },
  waitingFriends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'waitingFriends'
  },
  sugar: {
    type: String
  },
  quantity: {
    type: String
  },
  position: {
    type: String
  },
  compagny: {
    type: String
  },
  compagny: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String]
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
