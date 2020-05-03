const express = require("express");
const expressSession = require("express-session");
const cors = require("cors");
global.config = require("./config");
const { port } = require("./config");

const server = express();

const restsController = require("./controllers/restaurants");
const usersController = require("./controllers/users");

server.use(cors({ origin: `http://localhost:4200`, credentials: true }));
server.use(express.json());
server.use(
  expressSession({
    name: "VacationLoginCookie",
    secret: "have-a-nice-vacation",
    resave: true,
    saveUninitialized: false
  })
);

server.use("/api/restaurants", restsController);
server.use("/api/users", usersController);


server.listen(port, () =>
  console.log(`Server books running on port http://localhost:${port}`)
);