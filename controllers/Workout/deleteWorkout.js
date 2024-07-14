// controllers/workoutController.js

const Workout = require("../../models/Workout");

async function deleteWorkout(req, res) {
    const { userId, workoutObjectId } = req.params;

    try {
        const workout = await Workout.findOneAndUpdate(
            { userId: userId, 'workouts._id': workoutObjectId },
            { $pull: { workouts: { _id: workoutObjectId } } },
            { new: true }
        );

        if (!workout) {
            return res.status(404).json({ message: "Workout has already deleted from the list!" });
        }
        res.status(200).json({ message: "Workout deleted successfully", workout: workout });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { deleteWorkout };
