import * as express from "express";
import * as socketIO from "socket.io";
import * as http from "http";
import { PrismaClient } from "@prisma/client";
import * as cors from "cors";

const prisma = new PrismaClient();
const app: express.Application = express();
const server = http.createServer(app);
const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
io.on("connection", (socket) => {
  socket.on("init_data", async () => {
    console.log("New connection");
    const allFoodItems = await prisma.foodItem.findMany();
    io.sockets.emit("get_data", allFoodItems);
  });
});
app.get("/", (req, res) => {
  res.send("Helo world");
});

app.post("/order", async (req, res) => {
  const body = await req.body;
  console.log(body);
  await prisma.foodItem.update({
    where: {
      id: req.body.id,
    },
    data: {
      ordQty: {
        increment: 1,
      },
    },
  });
  const allFoodItems = await prisma.foodItem.findMany();
  io.sockets.emit("update_order", allFoodItems);
  await res.status(200).send("Done");
});

server.listen(6969, () => {
  console.log("Server running on http://localhost:6969");
});

app.listen(4200, () => {
  console.log("API server running on http://localhost:4200");
});
