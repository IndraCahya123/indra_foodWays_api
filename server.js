const express = require("express");

const app = express()

const router = require("./src/routes");

const portServer = 3000;

//body parser
app.use(express.json());

//routes group
app.use("/api/v1", router);

app.listen(portServer, () => console.log(`your server is running at port : ${portServer}`));

//root url = localhost:3000/api/v1