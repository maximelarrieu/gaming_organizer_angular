const db = require('../models')
const ROLES = db.ROLES
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if(err) {
      return res.status(500).send({message: err})
    }
    if(user) {
      return res.status(400).send({message: "Ce nom d'utilisateur est déjà utilisé."})
    }

    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if(err) {
        return res.status(500).send({message: err})
      }
      if(user) {
        return res.status(400).send({message: "Cette adresse email est déjà utilisée."})
      }
      next();
    })
  })
}

checkRolesExisted = (req, res, next) => {
  if(req.body.roles) {
    for(let index = 0; index < req.body.roles.length; index++) {
      if(!ROLES.includes(req.body.roles[index])) {
        return res.status(400).send({
          message: `Erreur. Le rôle ${req.body.roles[index]} n'existe pas.`
        })
      }
    }
  }
  next();
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}

module.exports = verifySignUp;
