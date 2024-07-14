const Workout = require("../../models/Workout");

async function scheduleWorkout(req, res) {
    const { secheduledFor, completed, workoutId } = req.body;
    const { userId } = req.params;
    
    try {
        // Check if there is an existing workout with the same workoutId and scheduledFor time
        const existingWorkout = await Workout.findOne({
            userId: userId,
            'workouts.workoutId': workoutId,
            'workouts.secheduledFor': secheduledFor
        });

        if (existingWorkout) {
            // Workout with the same workoutId and secheduledFor already exists
            return res.status(400).json({ message: 'Workout with the same workoutId and scheduledFor time already exists.' });
        } else {
            // No existing workout found, proceed to add the new workout
            let updatedWorkout = await Workout.findOneAndUpdate(
                { userId: userId },
                {
                    $push: {
                        workouts: {
                            secheduledFor: secheduledFor,
                            completed: completed || false,
                            workoutId: workoutId
                        }
                    }
                },
                { new: true, upsert: true }
            );

            if (updatedWorkout) {
                return res.status(200).json({ message: 'Successfully updated workouts data' });
            } else {
                return res.status(500).json({ message: 'Failed to update workouts data' });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { scheduleWorkout };
