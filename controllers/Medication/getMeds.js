const Medication = require("../../models/Medication");

async function getMeds(req,res){
    try {
        // Get the current date
        const currentDate = new Date();

        const medications = await Medication.find({
            userId: req.params.userId,
            endDate: { $gte: currentDate },
        });
        res.status(200).json(medications);

    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = {getMeds};