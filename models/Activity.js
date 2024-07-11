const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    activity: String,
    progress: String,
    workout: Array,
    message: String,
    caloriesBurned: Number
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Activity', activitySchema);