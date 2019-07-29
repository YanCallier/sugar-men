const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const socketListener = require('./config/socket')(io);

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// io.on('connection', function(socket) {
//   console.log('Socket ready');
//   console.log(socket.id);

//   socket.on('hello', function(payload) {
//     console.log(payload);
//   });
// });

const PORT = process.env.PORT || 5000;
//const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
