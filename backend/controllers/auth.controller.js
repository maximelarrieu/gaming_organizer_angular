const config = require("../config/auth.config")
const db = require('../models')
const User = db.user
const Role = db.role

let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })

  user.save((err, user) => {
    if(err) {
      return res.status(500).send({message: err})
    }
    if(req.body.roles) {
      Role.find(
        {
          name: {$in: req.body.roles}
        },
        (err, roles) => {
          if(err) {
            return res.status(500).send({message: err})
          }
          user.roles = roles.map(role => role._id)
          user.save(err => {
            if(err) {
              return res.status(500).send({message: err})
            }
            res.send({message: "Utilisateur enregistré en base de données."})
          })
        }
      )
    } else {
      Role.findOne({name: "user"}, (err, role) => {
        if(err) {
          return res.status(500).send({message: err})
        }
        user.roles = [role._id]
        user.save(err => {
          if(err) {
            return res.status(500).send({message: err})
          }
          res.send({message: "Utilisateur enregistré en base de données."})
        })
      })
    }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if(err) {
        return res.status(500).send({message: err})
      }
      if(!user) {
        return res.status(404).send({message: "Cet utilisateur n'existe pas"})
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )
      if(!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide."
        })
      }

      let token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400
      })

      let authorities = []
      for(let index = 0; index < user.roles.length; index++) {
        authorities.push("ROLE_" + user.roles[index].name.toUpperCase())
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    })
}
