// Server initialized 
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '/')));
const cors = require('cors')({origin: true});
app.use(cors);

app.get('/', (req, res) =>{
    
    res.sendfile("index.html");
  
});

server = app.listen(process.env.PORT || 3000);


// WebSocket Initialized
const io = require('socket.io')(server);
var allUsers = [];

io.on('connection', (socket) => {
    
    console.log("new user connected");
    
      
    
    

    socket.user = "New User";
    
    socket.on('new_message', (data) => {
      
        io.sockets.emit('new_message', {user: socket.user, message : data.message});
    })
    
    socket.on('new_user', (data) => {
      
        socket.user = data.user;
        allUsers.push(socket.user);
        io.sockets.emit('new_message', {user: socket.user, message : data.message});
        io.sockets.emit('update_users', {users: allUsers});
    })
    
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {user : socket.user})
    })
    
    socket.on("notTyping", (data) => {
    	socket.broadcast.emit('notTyping')
    })

    socket.on('disconnect', function () {
        console.log('A user disconnected');
        io.sockets.emit('disconnect', {user: socket.user});
     });

   /* socket.on("end", (data) => {
        for(var i = 0; i < allUsers.length; i ++) {
            if(allUsers[i] == socket.user) {
                allUsers[i] = "";
            }
        }
        socket.disconnect(true)
    })
    */
    
    
 
});




   
    


