const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'));

let connections = {};

io.sockets.on('connection', (socket) => {
  socket.on('room', (room) => {
    connections[room] = (connections[room] || 0) + 1;
    socket.join(room);
    socket.emit('colour', connections[room]); // To assign a colour to each new person
  });

  socket.on('draw_line', (data) => {
    io.sockets.in(data.room).emit('draw_line', data);
  });
});

app.get('/:id', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000);
