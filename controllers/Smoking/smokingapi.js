const Smoking = require("../../models/Smoking");

async function smokingApi(req, res) {
    try {
        const record = await Smoking.findOne({ userId: req.params.id })
        if (!record) {
            const newRecord = new Smoking({
                userId: req.params.id,
                cigarettes: 1
            })
            await newRecord.save().then(() => {
                res.status(200).json({ message: 'New Smoking Record Created' })
            })
        } else {
            await Smoking.findOneAndUpdate({ userId: req.params.id }, { cigarettes: record.cigarettes + 1 }).then(() => {
                res.status(200).json({ message: `Watchout bro it's getting too much ${record.cigarettes + 1}` })
            })
        }
    } catch (e) { }
}

module.exports = smokingApi;