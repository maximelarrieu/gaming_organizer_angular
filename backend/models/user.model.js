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
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  ],
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    }
  ]
})

const GameModel = mongoose.model('User', UserSchema)
module.exports = GameModel
