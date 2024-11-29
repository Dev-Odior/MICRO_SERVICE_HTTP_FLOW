const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const PORT = 8000;

const StartServer = async () => {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/customer", proxy("http://localhost:8001"));
  app.use("/shopping", proxy("http://localhost:8003"));
  app.use("/", proxy("http://localhost:8002"));

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
