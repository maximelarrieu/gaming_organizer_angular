const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    lowercase: false
  },
  image: {
    type: String,
    required: true,
    lowercase: false
  },
  releaseAt: {
    type: Date,
    required: false
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

const GameModel = mongoose.model('Game', GameSchema)
module.exports = GameModel
