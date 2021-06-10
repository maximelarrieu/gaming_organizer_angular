const Message = require("../models/message.model")

const findAll = async(req, res) => {
  return await Message.find().populate({
    path: "sender",
    model: "User"
  }).then(data => {
    res.json(data)
  })
}

const create = async(req, res) => {
  let message = new Message(req.body)
  await message.save(err => {
    if(err) {
      console.log(err)
    }
    res.sendStatus(200)
  })
}

exports.findAll = findAll
exports.create = create
