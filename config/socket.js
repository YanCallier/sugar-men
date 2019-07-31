const users = {};

const socketListener = function(io) {
  io.on('connection', function(socket) {
    console.log('Socket ready ' + socket.id);

    socket.on('hello', function(user) {
      users[socket.id] = {
        name: user.name,
        avatar: user.avatar,
        id: user._id,
        unviewMessages: {}
      };

      io.emit('onlinePeople', users);
    });

    socket.on('needPeople', function() {
      console.log('jenvoi');
      socket.emit('onlinePeople', users);
    });

    socket.on('openChat', function(friendId) {
      for (user in users) {
        if (users[user].id === friendId) {
          socket.emit('chatFriend', users[user]);
        }
      }
    });

    chatCollection = {};
    socket.on(
      'chatMessage',
      ({ payload: { text, authorId, authorName, friendId } }) => {
        //   var chatId = authorId + friendId
        let friendSocket;
        for (user in users) {
          if (users[user].id === friendId) {
            friendSocket = user;
          }
        }

        let chatId;
        if (chatCollection[authorId + friendId]) chatId = authorId + friendId;
        if (chatCollection[friendId + authorId]) chatId = friendId + authorId;

        if (!chatId) {
          chatId = authorId + friendId;
          chatCollection[chatId] = [{ author: authorName, text: text }];
        } else {
          chatCollection[chatId].push({
            author: authorName,
            text: text
          });
        }

        socket.emit('conversationUpdate', chatCollection[chatId]);

        if (socket.id !== friendSocket) {
          io.to(`${friendSocket}`).emit(
            'conversationUpdate',
            chatCollection[chatId]
          );
        }

        io.to(`${friendSocket}`).emit('incomingMessage', authorId);
      }
    );

    socket.on('unviewMessage', function(id) {
      users[socket.id].unviewMessages[id] = true;
      socket.emit('updateUnviewMessages', users[socket.id].unviewMessages);
    });

    socket.on('removeUnviewMessages', function(id) {
      if (users[socket.id].unviewMessages[id]) {
        delete users[socket.id].unviewMessages[id];
        socket.emit('updateUnviewMessages', users[socket.id].unviewMessages);
      }
    });

    socket.on('by', function() {
      console.log('A+ ' + socket.id);
      delete users[socket.id];
      socket.emit('onlinePeople', users);
      for (user in users) {
        console.log(user);
      }
      socket.disconnect();
    });
  });
};

module.exports = socketListener;
