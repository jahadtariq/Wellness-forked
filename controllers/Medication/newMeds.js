const Medication = require("../../models/Medication");

async function newMeds(req,res)
{
    const {
        userId,
        medicationName,
        dossage,
        frequency,
        startDate,
        endDate,
        times
    } = req.body;
    try {
        const timesAsDate = times.map((time) => {
            const date = new Date(time);
            return date;
        });
        const newMedication = new Medication({
            userId,
            medicationName,
            startDate,
            endDate,
            frequency,
            dossage,
            times: timesAsDate,
        });

        // Fix the number of times input at frontend based on the frequency

        const timeToNotify = frequency / 24;
        await newMedication.save();
        // .then(() => {
        //     console.log("Medication Scheduler Running");

        //     console.log(timeToNotify);

        //     let string = `0 */${timeToNotify} * * *`

        //     cron.schedule(string, () => {
        //         console.log('Dawayi khawoooooooooo........')
        //     });
        // })

        res.status(200).json({ message: 'Medication saved successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Server Error');
        return;
}};

module.exports = { newMeds };

