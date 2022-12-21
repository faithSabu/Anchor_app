const dotenv = require('dotenv')
dotenv.config();

const mongoose = require('mongoose');

module.exports = {
    "database" : process.env.DB_URL
}