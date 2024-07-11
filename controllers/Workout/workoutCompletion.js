const Activity = require("../../models/Activity");
const Workout = require("../../models/Workout");

async function workoutCompletion(req, res) {
    const { id } = req.params;
    const { markAs } = req.body;
    try {
        const workout = await Workout.findOne({ userId: id })
        if (workout.completed) {
            res.status(200).json({ message: 'Marked workout is already completed' })
        } else {
            await Workout.findOneAndUpdate({ userId: id }, { completed: markAs === 'true' || true ? true : false, completedOn: new Date().toLocaleDateString() })
                .then(async () => {
                    const olderRecord = await Activity.findOne({ activity: 'Workout' })
                    if (olderRecord) {
                        await Activity.findOneAndUpdate({ userId: id }, { message: `Workout marked ${markAs}`, caloriesBurned: olderRecord.caloriesBurned, workout: [...olderRecord.workout, workout] })
                            .then(() => {
                                res.status(200).json({ message: `Activities tree updated successfully` })
                            })
                    } else {
                        const newActivityRecord = new Activity({
                            userId: id,
                            activity: 'Workout',
                            message: `Workout marked completed`,
                            workout: [workout],
                            caloriesBurned: workout.caloriesBurned
                        })
                        await newActivityRecord.save().then(() => res.status(200).json({ message: `Activities tree updated successfully` }))
                    }
                })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { workoutCompletion }