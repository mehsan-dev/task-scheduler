import express from "express";
import TaskRouter from "./api/task.routes";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";

declare global {
  namespace Express {
    interface Request {
      payload: any;
    }
  }
}

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Store clients
let clients: any = [];

io.on("connection", (socket: any) => {
  console.log("New client connected");

  clients.push(socket);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clients = clients.filter((client: any) => client !== socket);
  });

  socket.on("error", (error: Error) => {
    console.error("Socket error:", error.message);
  });
});

app.use((req: any, res, next) => {
  req.io = io;
  next();
});

app.use("/api/task", TaskRouter);

export default server;
