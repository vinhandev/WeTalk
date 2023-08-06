const express = require("express");
const app = express();
const PORT = 4000;

//New imports
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("join_room", (data) => {
    socket.join('123');
  });
  
  socket.on("send_message", (data) => {
    socket.to('123').emit("receive_message", `${socket.id}: ${data}`);
  });
  
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.use(cors());

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
