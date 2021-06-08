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
