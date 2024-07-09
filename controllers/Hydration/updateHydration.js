const Activity = require('../../models/Activity');
const Hydration = require('../../models/Hydration');

async function updateHydration(req, res) {
    const { id } = req.params;
    const {
        userId,
        amount,
        glasses,
        time
    } = req.body;

    try {
        let userTrackRecord = await Hydration.findOne({ userId: id });

        if (userTrackRecord) {
            // Update the existing hydration record
            userTrackRecord.amount += 1;
            userTrackRecord.totallNumberOfGlasses += 1;
            await userTrackRecord.save();

            // Update or create the activity log for hydration
            let todaysActivity = await Activity.findOne({ userId: id, activity: 'HydrationActivity' });
            const progress = (userTrackRecord.amount / userTrackRecord.preferences.glasses) * 100;

            if (todaysActivity) {
                todaysActivity.progress = progress;
                await todaysActivity.save();
            } else {
                const activityLog = new Activity({
                    userId: id,
                    activity: 'HydrationActivity',
                    progress: progress
                });
                await activityLog.save();
            }

            res.status(200).json({ message: "Successfully hydrated" });
        } else {
            // Create a new hydration record
            const newHydration = new Hydration({
                userId,
                amount,
                notes,
                totallNumberOfGlasses: amount,
                preferences: {
                    glasses,
                    time
                }
            });

            await newHydration.save();

            const activityLog = new Activity({
                userId: id,
                activity: 'HydrationActivity',
                progress: (amount / glasses) * 100
            });

            await activityLog.save();

            res.status(200).json({ message: "Hydration tracking saved successfully" });
        }
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Server Error');
    }
};

module.exports = { updateHydration };
