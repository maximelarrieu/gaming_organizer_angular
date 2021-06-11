const User = require("../models/user.model")
const Game = require("../models/game.model")

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content")
}

exports.userAccess = (req, res) => {
  res.status(200).send("Connected Content")
}

exports.adminAccess = (req, res) => {
  res.status(200).send("Admin Content")
}

exports.moderatorAccess = (req, res) => {
  res.status(200).send("Moderator Content")
}

const findOne = async(req, res) => {
  return await User.findById({_id: req.params.id}).populate({
    path:"roles",
    model: "Role"
  }).populate({
    path:'games',
    model: "Game"
  }).then(data => {
    res.send(data)
  })
}

const addUserToGame = async(req, res) => {
  return Game.findByIdAndUpdate(req.params.game_id, {$push: {users: req.params.user_id}});
}

const removeUserToGame = async(req, res) => {
  return Game.findByIdAndUpdate(req.params.game_id, {$pull: {users: req.params.user_id}});
}

exports.findOne = findOne
exports.addUserToGame = addUserToGame
exports.removeUserToGame = removeUserToGame
