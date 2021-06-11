const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sendAt: {
    type: Date
  }
})

const MessageModel = mongoose.model('Message', MessageSchema)
module.exports = MessageModel
