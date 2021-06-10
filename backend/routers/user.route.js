const authJwt = require("../middlewares/authJwt")
const controller = require("../controllers/user.controller")

const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app) {
  let router = require("express").Router()

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  })

  router.get("/all", controller.allAccess)
  router.get("/user", [authJwt.verifyToken], controller.userAccess)
  router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminAccess)
  router.get("/:id", jsonParser, urlEncodedParser, controller.findOne)

  app.use("/api/users", router)

}
