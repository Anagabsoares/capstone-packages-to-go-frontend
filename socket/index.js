import { Server } from "socket.io";
import { authorize } from "@thream/socketio-jwt";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

const isValidJwt = (header) => {
  const token = header.split(" ")[1];
  if (
    token ===
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjFsT0x6Uk9Pa0U3cFo5WUFlSlRWQSJ9.eyJpc3MiOiJodHRwczovL2NhcHN0b25lLXBhY2thZ2UtdG8tZ28udXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYxZWYwY2ZhODY4ZmQ0MDA2OTgzOGZhMyIsImF1ZCI6WyJodHRwczovL3BhY2thZ2VzLXRvLWdvLmNvbSIsImh0dHBzOi8vY2Fwc3RvbmUtcGFja2FnZS10by1nby51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjQ0NjE1NTkxLCJleHAiOjE2NDQ3MDE5OTEsImF6cCI6Im9sSHJWQTlsalRhcmhGNDN3NVBMdHhISXE0TkhuRlNlIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbImNyZWF0ZTpwYWNrYWdlIiwiY3JlYXRlOnVzZXIiLCJkZWxldGU6cGFja2FnZSIsImRlbGV0ZTp1c2VyIiwicmVhZDpkZWxpdmVyeS1yZXF1ZXN0cyIsInJlYWQ6cGFja2FnZSIsInJlYWQ6cGFja2FnZXMiLCJyZWFkOnBhY2thZ2VzLWRlbGl2ZXJlZCIsInJlYWQ6cGFja2FnZXMtbm90LWRlbGl2ZXJlZCIsInJlYWQ6cGFja2FnZXMtdXNlciIsInJlYWQ6dXNlciIsInJlYWQ6dXNlcnMiLCJ1cGRhdGU6ZGVsaXZlcnktc3RhdHVzIiwidXBkYXRlOnBhY2thZ2VzIiwidXBkYXRlOnVzZXIiXX0.VKc1zdRuu1bSsZRBTAPVoraJKYUF_vhQmaFr24lOdYNMZFu-ZF65cBbZ38tGyVtxNSzDFmeCL2dXEmdgAe38FB2d_uRPU7-7FhQgS4gIOdAerr9wTj4bC1Pacn_tQpUfVd45Ar4tO6N7V0XCKC-O0RBoBlnZwl9kO_rbWluJxIyop09PRT_AdHOm570IpDhb1ByzzOaI7cbtSY3SQJliXVnCsQHcqyL48Ndbv9PK8BssMvBbrJlADZmN06N0f5VOR_fG-g7jfgbCiSsLM6kQJQBi5Dl4xpvJWp6lRjcwrrxa79-Q5DQq82J-WEjwJ3D4NrHYtQINU9TPWFm5QNjbYw"
  ) {
    return true;
  } else {
    return false;
  }
};

// io.of('/test');
io.use((socket, next) => {
  const header = socket.handshake.headers["authorization"];
  console.log(header);

  return next();
});
io.on("connection", (socket) => {
  console.log(socket);
  console.log("I am connected");
  socket.on("room", (room) => {
    console.log(room);
    socket.join(room);
  });
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

setInterval(() => {
  io.sockets.to("room1").emit("message", "what is going on, party people?");
}, 3000);

setInterval(() => {
  io.sockets.to("room2").emit("message", "anyone in this room yet?");
}, 3000);

io.listen(9000);
