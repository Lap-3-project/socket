
const server = require('./server');

const port = process.env.PORT || 8001;

server.listen(port, () => console.log(`Socket.io now running on port ${port}`))
