'use strict';

require('dotenv').config();

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL || "mongodb://localhost/poll-app"
                     


exports.PORT = process.env.PORT ||8080;

//DATABASE_URL = 'mongodb://dev:dev@ds153732.mlab.com:53732/poll-app'