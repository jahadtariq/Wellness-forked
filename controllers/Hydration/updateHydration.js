const Hydration = require('../../models/Hydration');

async function updateHydration(req, res) {
    const { id } = req.params;
    const {
        userId,
        amount,
        notes,
        glasses,
        time
    } = req.body;
    try {
        const userTrackRecord = await Hydration.findOne({ userId: id })
        if (userTrackRecord) {

            const hydration = await Hydration.findOne({ userId: id })
            await Hydration.findOneAndUpdate({ userId: id }, { amount: hydration.amount + 1 }).then(() => {
                console.log("Pani piya successfully")
            })
        } else {
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
            res.status(200).json({ message: 'Hydration saved successfully' });
        }
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Server Error');
        return;
    }
};

module.exports = { updateHydration };