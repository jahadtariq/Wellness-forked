const Hydration = require('../../models/Hydration');

async function updatePreferences(req, res) {
    const { id } = req.params;
    const {
        glasses,
        time
    } = req.body;
    try {
        const userTrackRecord = await Hydration.findOne({ userId: id })
        if (userTrackRecord) {
            const updatedHydration = new Hydration({
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

module.exports = { updatePreferences };