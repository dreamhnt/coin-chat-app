var express = require('express');
var app = express();
var http = require('http').Server(app); 
var io = require('socket.io')(http);   

app.get('/',function(req, res){ 
  res.sendFile(__dirname + '/index.html'); //
});

var count=1;
io.on('connection', socket => { 
  console.log('user connected: ', socket.id);  
  io.to(socket.id).emit('change name', 'user' + count);  

  socket.on('disconnect', _ => {
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', obj => {
    io.emit('receive message', obj);
  });
});

http.listen(process.env.PORT || 3000, _ => {
  console.log('server on! port:3000');
});