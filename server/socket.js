const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
    },
});

io.on("connect", (socket) =>{
    console.log(`User Connected: ${socket.id}`);

    socket.on("join", ({userName, group}) => {
        socket.join(group);

        socket.to(group).emit("playerJoined")

        console.log(`${userName} joined to ${group}`);
    })

    socket.on("changePage", ({group, page}) => {
        socket.to(group).emit("pageChanged", page);
    })

    socket.on("getRolledItem", ({group}) => {
        socket.to(group).emit("RolledItemChanged");
    })

    // socket.emit("hello", "hello from server");
})

server.listen(4000, () => {
    console.log("SERVER IS RUNNING");
})