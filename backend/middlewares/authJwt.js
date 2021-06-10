const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Game = db.game;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]

  if(!token) {
    return res.status(403).send({message: "Token non valide."})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.status(401).send({message: "Non autorisé"})
    }
    req.userId = decoded.id
    next();
  })
}

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if(err) {
      return res.status(500).send({message: err})
    }

    Role.find(
      {
      _id: {$in: user.roles}
      },
      (err, roles) => {
        if(err) {
          return res.status(500).send({message: err})
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        return res.status(403).send({ message: "Require Admin Role!" });
      }
    )
  })
}

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }

    Role.find(
      {
        _id: {$in: user.roles}
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({message: err});
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        return res.status(403).send({message: "Require Moderator Role!"});
      }
    );
  });
}

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
}
module.exports = authJwt
