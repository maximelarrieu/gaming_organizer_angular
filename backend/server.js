const http = require('http')
const PORT = 3001
const express = require('express')
const logger = require('morgan')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dbConfig = require("./config/db.config");
const {HttpHeaders} = require("@angular/common/http");

const db = require("./models/")
const Role = db.role;

const app = express()
new HttpHeaders().set('access-control-allow-origin', "http://localhost:3001/api/ga")
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger("MORGAN = :method - :url"))

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
    console.log("Connected to Mongo");
    initial();
  }
)

require("./routers/game.route")(app)
require("./routers/auth.route")(app)
require("./routers/user.route")(app)

app.get("/", function(req, res) {
  console.log("BONSOIR")
})

http.createServer(app).listen(PORT);

console.log(`Port listen on : ${PORT}`);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection")
      })
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection")
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  })
}
