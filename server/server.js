const express = require("express");
const app = express();
const PORT = 4000;

//New imports
const http = require("http");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

const { Server } = require("socket.io");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const dbConfig = require("./app/config/db.config.js");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      new Role({
        name: "user",
      }).save();

      new Role({
        name: "moderator",
      }).save();

      new Role({
        name: "admin",
      }).save();
    }
  } catch (error) {
    console.log("⚠️ERROR:" + e.message);
  }
}

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
    socket.join("123");
  });

  socket.on("send_message", (data) => {
    io.in("123").emit("receive_message", `${data.username}: ${data.message}`);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
