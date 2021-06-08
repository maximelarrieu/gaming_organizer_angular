const authJwt = require("../middlewares/authJwt")
const controller = require("../controllers/user.controller")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  })

  app.get("/users/all", controller.allAccess)
  app.get("/users/user", [authJwt.verifyToken], controller.userAccess)
  app.get("/users/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminAccess)
}
