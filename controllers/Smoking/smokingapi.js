const Smoking = require('../../models/Smoking');
const Activity = require('../../models/Activity');

async function smokingApi(req, res) {
    try {
        const { id } = req.params;
        // Find the smoking record for the user
        let record = await Smoking.findOne({ userId: id });
        if (!record) {
            // If no record exists, create a new one
            record = new Smoking({
                userId: id,
                cigarettes: 1
            });
            await record.save();
            // Create activity log for smoking
            await createOrUpdateActivityLog(id, 100);
            res.status(200).json({ message: 'New Smoking Record Created' });
        } else {
            record.cigarettes++;
            await record.save();
            // Calculate progress based on cigarettes smoked
            const progress = calculateProgress(record.cigarettes);
            // Create or update activity log for smoking
            await createOrUpdateActivityLog(id, progress);
            res.status(200).json({ message: `Watch out bro, it's getting too much ${record.cigarettes}` });
        }
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Server Error');
    }
}

// Function to create or update activity log
async function createOrUpdateActivityLog(userId, progress) {
    let activityLog = await Activity.findOne({ userId, activity: 'SmokingActivity' });
    if (activityLog) {
        activityLog.progress = progress;
    } else {
        activityLog = new Activity({
            userId,
            activity: 'SmokingActivity',
            progress
        });
    }

    await activityLog.save();
}
// Function to calculate progress based on cigarettes smoked
function calculateProgress(cigarettes) {
    return 100 - (cigarettes / 10) * 100; // Adjust as per your logic
}

module.exports = { smokingApi };
