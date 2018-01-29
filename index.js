var express = require('express');
var app = express();
var http = require('http').Server(app); 
var io = require('socket.io')(http);   

// app.get('/',function(req, res){ 
//   res.sendFile(__dirname + '/client.html');
// });

var count=1;
io.on('connection', socket => { 
  console.log('user connected: ', socket.id);  
  io.to(socket.id).emit('change name', 'user' + count);  

  socket.on('disconnect', _ => {
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', (obj) => {
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});

http.listen(3000, _ => {
  console.log('server on!');
});