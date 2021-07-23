
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer
        , {
            cors: {
              origin: '*',
            }
          }
    //     , {
    //     cors: {
    //       origin: "http://localhost:8000",
    //       credentials: true
    //     }   }
   )
    io.sockets.on('connection',function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnect');
        })

        socket.on('join_room',function(data){
            console.log('joining request recieved ', data)
            socket.join(data.chatroom)

            io.in(data.chatroom).emit('user joined',data)
        })
        //detect send message and broadcast to everyone in the room
        socket.on('send_message',function(data){
          io.in(data.chatroom).emit('received_message',data)
        })
    })


}