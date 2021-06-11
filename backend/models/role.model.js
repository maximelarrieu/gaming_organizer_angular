const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  }
})

const RoleModel = mongoose.model('Role', RoleSchema)
module.exports = RoleModel
