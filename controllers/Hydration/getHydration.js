const Hydration = require('../../models/Hydration');

async function getHydration(req, res) {
  try {
    const { id } = req.params.id;
    // Find the hydration document for the given userId
    const hydration = await Hydration.findOne({ id });
    if (!hydration) {
      return res.status(404).json({ message: 'Hydration data not found' });
    }
    res.status(200).json(hydration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHydration };