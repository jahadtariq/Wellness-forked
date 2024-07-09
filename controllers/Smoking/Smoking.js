const Smooking = require('../../models/Smoking');

async function getSmoking(req,res){
    try {
        const smokingEntries = await SmokingService.getSmokingEntries(req.user.id);
        res.json(smokingEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function updateSmoking(req,res){
    try {
        const smokingEntry = await SmokingService.updateSmokingEntry(req.params.id, req.user.id, req.body);
        if (!smokingEntry) {
          return res.status(404).json({ message: 'Smoking entry not found' });
        }
        res.json(smokingEntry);
      } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function newSmoking(req,res){
    const { userId, date, cigarettes } = req.body;

    try {
      const newSmokingEntry = await SmokingService.createSmokingEntry({
        userId,
        date,
        cigarettes
      });
      res.status(201).json(newSmokingEntry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

module.exports = { newSmoking, updateSmoking, getSmoking };