// connecthire-backend/services/socketService.js

module.exports = function(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
