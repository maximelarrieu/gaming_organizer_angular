const Event = require("../models/event.model")

const findAll = async(req, res) => {
  return await Event.find().then(data => {
    res.send(data)
  })
}

const findOne = async(req, res) => {
  return await Event.findById({_id: req.params.id}).then(data => {
    res.send(data)
  })
}

const create = async(req, res) => {
  const event = new Event(req.body)
  try {
    await event.save()
  } catch(err) {
    res.status(500).send(err)
  }
}

const addEventToUser = async(req, res) => {
  return Event.findByIdAndUpdate(req.params.user_id, {$push: {games: req.params.game_id}});
}

const removeEventToUser = async(req, res) => {
  return Event.findByIdAndUpdate(req.params.user_id, {$pull: {games: req.params.game_id}})
}

exports.findAll = findAll
exports.findOne = findOne
exports.create = create
/*exports.addGameToUser = addGameToUser
exports.removeGameToUser = removeGameToUser*/
