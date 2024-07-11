const Workout = require("../../models/Workout");

async function getWorkouts(req, res) {
    try {
        const workouts = await Workout.find({ userId: req.params.userId });
        res.status(200).json(workouts);
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Server Error');
        return;
    }
}


module.exports = { getWorkouts }