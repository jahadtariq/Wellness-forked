const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  userId:  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  monday: {
    sleepTime: String,
    wakeTime: String
  },
  tuesday: {
    sleepTime: String,
    wakeTime: String
  },
  wednesday: {
    sleepTime: String,
    wakeTime: String
  },
  thursday: {
    sleepTime: String,
    wakeTime: String
  },
  friday: {
    sleepTime: String,
    wakeTime: String
  },
  saturday: {
    sleepTime: String,
    wakeTime: String
  },
  sunday: {
    sleepTime: String,
    wakeTime: String
  }
});

const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = Sleep;