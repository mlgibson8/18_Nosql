const { connect, connection } = require('mongoose');
require('dotenv').config();

process.env.MONGODB_URI || 'mongodb:///127.0.0.1.27017/socialDB';



module.exports = connection;