const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    lowercase: false
  },
  password: {
    type: String,
    required: true,
    lowercase: false
  },
  createdAt: {
    type: Date,
    required: false
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    }
  ],
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
})

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel
