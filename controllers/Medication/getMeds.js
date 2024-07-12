const Medication = require("../../models/Medication");

async function getMeds(req, res) {
    try {
        // Get the current date
        const currentDate = new Date();
        const medications = await Medication.find({
            userId: req.params.userId,
            endDate: { $gte: currentDate },
        });
        if (medications.length > 0) {
            res.status(200).json(medications);
        } else {
            res.status(404).json({ message: 'No medications were found for the user' })
        }

    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = { getMeds };