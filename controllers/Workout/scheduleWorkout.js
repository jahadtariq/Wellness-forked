const Workout = require("../../models/Workout");

async function scheduleWorkout(req, res) {
    const { name, target, secondaryMuscles, bodyPart, equipment, instructions, gifUrl, secheduledFor, completed, caloriesBurned, id, url } = req.body;
    const { userId } = req.params;
    try {
        // const newSchedule = new Workout({
        //     workoutId: id,
        //     userId: userId,
        //     bodyPart: bodyPart,
        //     name: name,
        //     target: target,
        //     secondaryMuscles: secondaryMuscles,
        //     equipment: equipment,
        //     instructions: instructions,
        //     gifUrl: gifUrl,
        //     secheduledFor: secheduledFor,
        //     completed: completed ? completed : false,
        //     caloriesBurned: caloriesBurned,
        // })
        const newWorkout = new Workout({
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            workouts: [{
                secheduledFor: secheduledFor,
                completed: completed ? completed : false,
                url: url
            }]
        })
        await newWorkout.save().then(async () => {
            res.status(200).json(`New workout scheduled for ${secheduledFor}.`)
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
}



module.exports = { scheduleWorkout }