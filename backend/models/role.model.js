const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  }
})

const GameModel = mongoose.model('Role', RoleSchema)
module.exports = GameModel
