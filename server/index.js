const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connect", (socket) => {
  socket.emit("hello", "almaspite");
})

io.listen(4000);
