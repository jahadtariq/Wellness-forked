const mongoose = require('mongoose');
function connectToDatabase() {
    console.log('connecting to the databse...........')
    mongoose.connect('mongodb+srv://admin:ESkp0sknEgP1YpaK@cluster0.bp2y7j1.mongodb.net/wellness').then(() => {
        console.log('Connected to MongoDB');
    })
}

module.exports = { connectToDatabase }