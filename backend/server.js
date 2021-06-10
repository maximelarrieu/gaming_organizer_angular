const PORT = 3001
const express = require('express')
const logger = require('morgan')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
mongoose.Promise  = require("bluebird");
const dbConfig = require("./config/db.config");
const {HttpHeaders} = require("@angular/common/http");
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

const db = require("./models/")
const Role = db.role;

new HttpHeaders().set('access-control-allow-origin', "http://localhost:3001")
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
require("./routers/message.route")(app)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log("disconnected")
  })
  io.to(socket).emit()
  socket.on("message", (msg) => {
    console.log(`message : ${msg}`)
    socket.emit("message", {message: msg})

    let chatMessage = new Chat({message: msg, sender: "Anonymous"})
    chatMessage.save()
  })
});

http.listen(PORT, () => {
  console.log('listening on : *:' + PORT );
});

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

/*(function() {
  fetch("/message")
    .then(data  =>  {
      return  data.json();
    })
    .then(json  =>  {
      json.map(data  =>  {
        let  li  =  document.createElement("li");
        let messages = document.getElementById("messages")
        let  span  =  document.createElement("span");
        messages.appendChild(li).append(data.message);

        messages
          .appendChild(span)
          .append("by "  +  data.sender);
      });
    });
})();*/

/*(function() {
  $("form").submit(function(e) {
    let  li  =  document.createElement("li");
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", $("#message").val());
    messages.appendChild(li).append($("#message").val());
    let  span  =  document.createElement("span");
    messages.appendChild(span).append("by "  +  "Anonymous"  +  ": "  +  "just now");
    $("#message").val("");
    return  false;

  });
})();

(function(){
  socket.on("received", data  =>  {
    let  li  =  document.createElement("li");
    let  span  =  document.createElement("span");
    var  messages  =  document.getElementById("messages");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by "  +  "anonymous"  +  ": "  +  "just now");
  });
})



*/
