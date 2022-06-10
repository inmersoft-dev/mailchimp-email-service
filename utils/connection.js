class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("disconnect", () => {
      console.log("User disconnected");
      this.disconnect();
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function connection(io) {
  io.on("connection", (socket) => {
    console.log("User connected");
    new Connection(io, socket);
  });
}

module.exports = connection;
