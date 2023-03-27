import "./loadEnvironment.mjs";

const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");


app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;
const server = http.createServer(app);

/* require("")(app, db); */

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});