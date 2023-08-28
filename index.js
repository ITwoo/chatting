// const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const socketEvents = require('./app/socket.js');

const Koa = require("koa");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = new Koa();
const httpServer = createServer(app.callback());

app.use(cors())
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true
    }
});

socketEvents(io);

httpServer.listen(8081);