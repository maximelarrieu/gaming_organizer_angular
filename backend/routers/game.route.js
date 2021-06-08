const gameController = require("../controllers/game.controller")

const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({extended: false})

module.exports = app => {
  let router = require("express").Router()

  router.use((req, res, next) => {
    if(req.query._method === "DELETE") {
      req.method = "DELETE"
      req.url = req.path
    } else if(req.query._method === "PATCH") {
      req.method = "PATCH"
      req.url = req.path
    }
    next();
  })

  router.get("/", gameController.findAll)
  router.get("/:id", gameController.findOne)
  router.post("/", jsonParser, urlEncodedParser, gameController.create)
  router.post("/:game_id/add/to/:user_id", jsonParser, urlEncodedParser, gameController.addGameToUser)

  app.use("/api/games", router)
}
