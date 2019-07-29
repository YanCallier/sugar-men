const users = {};

const socketListener = function(io) {
  io.on('connection', function(socket) {
    console.log('Socket ready ' + socket.id);

    socket.on('hello', function(user) {
      users[user._id] = { name: user.name, avatar: user.avatar };

      socket.emit('onlinePeople', users);
    });

    socket.on('needPeople', function() {
      console.log('jenvoi');
      socket.emit('onlinePeople', users);
    });

    socket.on('by', function() {
      console.log('A+ ' + socket.id);
      socket.disconnect();
    });
  });
};

module.exports = socketListener;
