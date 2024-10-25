
import { Server } from "socket.io";
import http from "http";

// const { Server } = require("socket.io")
// const http = require("http");
// Create an HTTP server
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});


// WebSocket connection
io.on("connection", (socket) => {
  console.log("New client connected");
  // Handle bidUpdate
  socket.on("placedBid", () => {
    console.log("Client bidUpdate");
    io.emit("bidUpdated");   // generate bidUpdated event
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the WebSocket server
export function startWebSocketServer() {
  server.listen(4000, () => {
    console.log("WebSocket server is running on port 4000");
  });
}

// module.exports = { startWebSocketServer, io };
export { io }; // Export the io instance
