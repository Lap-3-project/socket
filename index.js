const server = require('./server');

const port = process.env.PORT || 5173;

server.listen(port, () => console.log(`Socket.io now running on port ${port}`))
