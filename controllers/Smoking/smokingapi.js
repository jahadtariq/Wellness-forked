const Smoking = require("../../models/Smoking");
const Activity = require('../../models/Activity'); // Assuming you have an Activity model

async function smokingApi(req, res) {
    try {
        const { id } = req.params;
        const record = await Smoking.findOne({ userId: id });

        if (!record) {
            const newRecord = new Smoking({
                userId: id,
                cigarettes: 1
            });
            await newRecord.save();
            // Create activity log for smoking
            const activityLog = new Activity({
                userId: id,
                activity: 'SmokingActivity',
                progress: 100 // You might adjust this based on your specific logic
            });
            await activityLog.save();
            res.status(200).json({ message: 'New Smoking Record Created' });
        } else {
            const updatedRecord = await Smoking.findOneAndUpdate(
                { userId: id },
                { cigarettes: record.cigarettes + 1 },
                { new: true } // To return the updated record
            );
            // Create or update activity log for smoking
            let todaysActivity = await Activity.findOne({ userId: id, activity: 'SmokingActivity' });
            const progress = 100 - (updatedRecord.cigarettes / 10) * 100; // Adjust as per your logic
            if (todaysActivity) {
                todaysActivity.progress = progress;
                await todaysActivity.save();
            } else {
                const activityLog = new Activity({
                    userId: id,
                    activity: 'SmokingActivity',
                    progress: progress
                });
                await activityLog.save();
            }
            res.status(200).json({ message: `Watch out bro, it's getting too much ${updatedRecord.cigarettes}` });
        }
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Server Error');
    }
}

module.exports = {smokingApi};
