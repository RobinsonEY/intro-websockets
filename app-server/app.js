const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
const Room = require("./room");

Http.listen(3000, () => {
    console.log("Listening at :3000...");
});

let position = {
    x: 200,
    y: 200
};

const room = new Room();

Socketio.on("connection", async (socket) => {
    socket.emit("position", position);
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x -= 5;
                Socketio.emit("position", position);
                break;
            case "right":
                position.x += 5;
                Socketio.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                Socketio.emit("position", position);
                break;
            case "down":
                position.y += 5;
                Socketio.emit("position", position);
                break;
        }
    });
    const roomID = await room.joinRoom();
    // join room
    socket.join(roomID);
  
    socket.on("send-message", (message) => {
      socket.to(roomID).emit("receive-message", message);
    });

    socket.on("typing", (value) => {
      Socketio.emit("typing", value);    
    });
  
    socket.on("disconnect", () => {
      // leave room
      room.leaveRoom();
    });
});