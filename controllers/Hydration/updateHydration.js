const Hydration = require('../../models/Hydration');

async function updateHydration(req,res){
    const { id } = req.params
    try {
        const hydration = await Hydration.findOne({ userId: id })
        await Hydration.findOneAndUpdate({ userId: id }, { amount: hydration.amount + 1 }).then(() => {
            console.log("Pani piya successfully")
        })
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Server Error');
        return;
    }
};

module.exports = { updateHydration };