const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const dbo = require("./db/conn");
const app = express();
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, ".", "build");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
var corsOptions = {
  origin: "http://localhost:" + PORT.toString(),
};
var users = [];

// Helper functions

const pushMessageToDB = (from, to, topic, message) => {
  return dbo.getDb("task5_intern").collection("messages")
    .insertOne({message: message,topic: topic, from: from,to: to,date: new Date()})
    .catch((err) => {
      throw new Error(err);
    });
};

const notifyUserBySocket = (usersArr, nick) => {
  usersArr.forEach((user) => {
    if (user.nick == nick) io.to(user.socket).emit("refresh", "");
  });
};

// Request hadling

const handleMessage = (req, res) => {
  pushMessageToDB(req.query.from, req.query.to, req.query.topic, req.query.message)
    .then(() => res.send({ message: "Sent!" }))
    .catch(() => res.status(500).send({ message: err }));
  notifyUserBySocket(users, req.query.to);
};

const handleGetMessages = (req, res) => {
  dbo.getDb("task5_intern").collection("messages").find({ to: req.query.to })
    .toArray(function (err, result) {
      if (err) return res.status(500).send({ message: err });
      res.send(result);
    });
};

const handleGetUsers = (req, res) => {
  let messages = dbo.getDb("task5_intern").collection("messages");
  messages.distinct("from")
    .then((result) => res.send(result));
};

io.on("connection", (socket) => {
  socket.on("joinmsg", (msg) => {
    let msgObj = JSON.parse(msg);
    pushMessageToDB(msgObj.nick, "server", "control", "joined");
    users.push({ nick: msgObj.nick, socket: socket.id });
  });
  socket.on("disconnect", () => {users = users.filter((user) => user.socket !== socket.id);});
});

// Driver code

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api/message", handleMessage);
app.get("/api/getMessages", handleGetMessages);
app.get("/api/getUsers", handleGetUsers);
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(PORT, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port ${PORT}.`);
});
