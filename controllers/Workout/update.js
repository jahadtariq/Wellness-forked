// controllers/workoutController.js

const Workout = require("../../models/Workout");

async function updateWorkout(req, res) {
    const { userId, workoutObjectId } = req.params;
    const { secheduledFor, completed } = req.body;

    try {
        let updateFields = {};

        // Check if completed is provided in the request body
        if (completed !== undefined) {
            updateFields['workouts.$.completed'] = completed;
        }

        // Check if secheduledFor is provided in the request body
        if (secheduledFor !== undefined) {
            // Validate secheduledFor against enum values
            const isValidSecheduledFor = [0, 1, 2, 3, 4, 5, 6].includes(Number(secheduledFor));
            if (!isValidSecheduledFor) {
                return res.status(400).json({ message: "Invalid value for secheduledFor" });
            }
            updateFields['workouts.$.secheduledFor'] = secheduledFor;
        }

        const workout = await Workout.findOneAndUpdate(
            { userId: userId, 'workouts._id': workoutObjectId },
            { $set: updateFields },
            { new: true }
        );

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
