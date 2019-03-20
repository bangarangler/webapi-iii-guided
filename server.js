const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

function teamNamer(req, res, next) {
  req.team = "Web 17";
  next();
}

function moodyGateKeeper(req, res, next) {
  const seconds = new Date().getSeconds();
  if (seconds % 3 === 0) {
    //res.status(403).json({ message: "You shall not pass" });
    res.status(403).send("You shall not pass!");
  } else {
    next();
  }
}

server.use(express.json());
server.use(helmet());
server.use(teamNamer);
//server.use(moodyGateKeeper);

server.use("/api/hubs", hubsRouter);

server.get("/", restricted, (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

function restricted(req, res, next) {
  const password = req.headers.password;

  if (password === "mellon") {
    next();
  } else {
    res.status(401).send("You shall not pass! only Hobbits travel here");
  }
}

module.exports = server;
