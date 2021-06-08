const verifySignUp  = require("../middlewares/verifySignUp")
const controller = require("../controllers/auth.controller")

module.exports = app => {
  let router = require("express").Router()

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/register",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  router.post("/login", controller.signin)

  app.use("/api", router)
}
