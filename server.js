"use strict";

const http = require("http");
const debug = require("debug")("nodestr:server");
const express = require("express");

const app = express();
const port = searchPort(process.env.PORT || 3000);
app.set("port", port);

const server = http.createServer(app);
const router = express.Router();

var route = router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Node Store API",
    version: "0.0.1"
  });
});
app.use("/", route);

server.listen(port);
console.log("API FUNCIONANDO NA PORTA: " + port);

function searchPort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}
