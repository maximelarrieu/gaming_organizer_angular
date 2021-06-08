const mongoose = require('mongoose')

const UserGameSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    lowercase: true
  },
  game: {
    type: String,
    required: true,
    lowercase: false
  }
})

const GameModel = mongoose.model('UserGame', UserGameSchema)
module.exports = GameModel
