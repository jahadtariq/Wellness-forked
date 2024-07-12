const mongoose = require('mongoose');

// const workoutSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     workoutId: String,
//     name: String,
//     target: String,
//     secondaryMuscles: [
//         String],
//     bodyPart: String,
//     equipment: String,
//     instructions: [
//         String
//     ],
//     gifUrl: String,
//     secheduledFor: Number,
//     completed: Boolean,
//     completedOn: Date,
//     caloriesBurned: Number,
// },
//     {
//         timestamps: true
//     }
// );

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workouts: [{
        secheduledFor: String,
        completed: Boolean,
        url: String
    }]
})

module.exports = mongoose.model('Workout', workoutSchema);