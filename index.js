// code away!
require('dotenv').config();
const server = require('./server');

server.listen(process.env.PORT, () => {
    console.log(`\n*** Your Server is running on ${process.env.PORT} ***\n`);
});