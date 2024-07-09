const Hydration = require('../../models/Hydration');

async function newHydration(req,res){
    const {
        userId,
        amount,
        notes,
        glasses,
        time
    } = req.body;

    // const timeToNotify = glasses / time;

    try {
        const newHydration = new Hydration({
            amount,
            notes,
            userId,
            preferences: {
                glasses,
                time
            }
        })

        await newHydration.save();
        // .then(() => {

        //     console.log(timeToNotify);

        //     console.log("Hydration Scheduler Running");

        //     let string = `0 */${timeToNotify} * * *`

        //     cron.schedule(string, () => {
        //         console.log('Pani piyoooooo........')
        //     });
        // })
        res.status(200).json({ message: 'Hydration saved successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Server Error');
        return;
    }
};

module.exports = { newHydration };