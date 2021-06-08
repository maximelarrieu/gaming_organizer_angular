const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.game = require("./game.model");
db.user_game = require("./user_game.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
