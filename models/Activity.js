const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true ,unique: true },
    calories: { type: Number },
    duration: { type: Number },
    activity: { type: Number },
    date: {type: Date}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Activity', activitySchema);