"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var path_1 = require("path");
var http_1 = require("http");
var server = (0, http_1.createServer)(app);
var socket_io_1 = require("socket.io");
var io = new socket_io_1.Server(server, { cors: { origin: '*' } });
var cors_1 = require("cors");
var compression_1 = require("compression");
var __dirname = (0, path_1.resolve)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use(express_1.default.static((0, path_1.join)(__dirname, 'dist')));
var PORT = process.env.PORT || 2000;
server.listen(PORT, function () {
    console.log("server running on port ".concat(PORT));
});
server.setTimeout(10000);