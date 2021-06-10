const Game = require("../models/game.model")
const User = require("../models/user.model")

const findAll = async(req, res) => {
  return await Game.find().then(data => {
    res.send(data)
  })
}

const findOne = async(req, res) => {
  return await Game.findById({_id: req.params.id}).then(data => {
    res.send(data)
  })
}

const create = async(req, res) => {
  const game = new Game(req.body)
  try {
    await game.save()
  } catch(err) {
    res.status(500).send(err)
  }
}

const addGameToUser = async(req, res) => {
  return User.findByIdAndUpdate(req.params.user_id, {$push: {games: req.params.game_id}});
}

const removeGameToUser = async(req, res) => {
  return User.findByIdAndUpdate(req.params.user_id, {$pull: {games: req.params.game_id}})
}

exports.findAll = findAll
exports.findOne = findOne
exports.create = create
exports.addGameToUser = addGameToUser
exports.removeGameToUser = removeGameToUser
