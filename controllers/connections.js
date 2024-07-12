const mongoose = require('mongoose');
function connectToDatabase() {
    console.log('connecting to the databse...........')
    mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(() => {
        console.log('Connected to MongoDB');
    })
}

module.exports = { connectToDatabase }