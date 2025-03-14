'use strict';

//const http = require('http');
const socket = require('socket.io');
//const server = http.createServer();
const port = 11100;
const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = socket(http, {
  pingInterval: 10000, // 10 giây kiểm tra kết nối
  pingTimeout: 5000    // 5 giây timeout nếu không phản hồi
});


app.get('/', (req, res) => {
    res.send('Server is running!');
});

http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


io.use((socket, next) => {
    if (socket.handshake.query.token === "UNITY") {
        next();
    } else {
        next(new Error("Authentication error"));
    }
});

io.on('connection', socket => {
  console.log('connection');

  setTimeout(() => {
    socket.emit('connection', {date: new Date().getTime(), data: "Hello Unity"})
  }, 1000);

  socket.on('hello', (data) => {
    console.log('hello', data);
    socket.emit('hello', {date: new Date().getTime(), data: data});
  });

  socket.on('spin', (data) => {
    console.log('spin');
    socket.emit('spin', {date: new Date().getTime(), data: data});
  });

  socket.on('class', (data) => {
    console.log('class', data);
    socket.emit('class', {date: new Date().getTime(), data: data});
  });
});


server.listen(port, () => {
  console.log('listening on *:' + port);
});
