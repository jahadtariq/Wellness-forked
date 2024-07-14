const Workout = require("../../models/Workout");

async function getWorkouts(req, res) {
    try {
        const workouts = await Workout.find({ userId: req.params.userId });
        if (workouts.length > 0) {
            res.status(200).json(workouts);
        } else {
            res.status(404).json({ message: 'No workouts found for this user' });
        }
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Error: ' + e.message });
        return;
    }
}


module.exports = { getWorkouts }