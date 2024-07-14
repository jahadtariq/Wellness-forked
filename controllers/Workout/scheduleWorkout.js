const Workout = require("../../models/Workout");

async function scheduleWorkout(req, res) {
    const {secheduledFor, completed, workoutId } = req.body;
    const { userId } = req.params;
    try {
        //Search for existing workouts scheduled..
        const existingWorkouts = await Workout.findOne({ userId: userId })
        if (existingWorkouts) {
            await Workout.findOneAndUpdate({ userId: userId }, {
                workouts: [...existingWorkouts.workouts, {
                    secheduledFor: secheduledFor,
                    completed: completed ? completed : false,
                    workoutId: workoutId
                }]
            }).then(() => {
                res.status(200).json({ message: 'Successfully updated workouts data' })
            })
        } else {

            const newWorkout = new Workout({
                userId: userId,
                workouts: [{
                    secheduledFor: secheduledFor,
                    completed: completed ? completed : false,
                    workoutId: workoutId
                }]
            })
            await newWorkout.save().then(async () => {
                res.status(200).json(`New workout scheduled for ${secheduledFor}.`)
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
}

module.exports = { scheduleWorkout }