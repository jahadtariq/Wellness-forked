const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true ,unique: true },
    title: { type: String }, // in bo of glasses
    description: { type: String },
    duration: { type: Number },
    calories: { type: Number },
    date: {type: Date}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Workout', workoutSchema);