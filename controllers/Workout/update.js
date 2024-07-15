// controllers/workoutController.js

const Workout = require("../../models/Workout");

async function updateWorkout(req, res) {
    const { userId, workoutId } = req.params;
    const { secheduledFor, completed } = req.body;

    try {
        let updateFields = {};

        if (completed !== undefined) {
            updateFields['workouts.$.completed'] = completed;
        }
        if (secheduledFor !== undefined) {
            updateFields['workouts.$.secheduledFor'] = secheduledFor;
        }

        const workout = await Workout.findOneAndUpdate(
            { userId: userId, 'workouts._id': workoutId },
            { $set: updateFields },
            { new: true }
        )

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json({ message: "Workout updated successfully", workout: workout });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { updateWorkout };
