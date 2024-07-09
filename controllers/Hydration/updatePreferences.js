const Hydration = require('../../models/Hydration');

async function updatePreferences(req, res) {
    try {
        const { id } = req.params.id;
        const { glasses, time } = req.body;
    
        // Find the hydration document for the given userId
        const hydration = await Hydration.findOne({ id });
    
        if (!hydration) {
          return res.status(404).json({ message: 'Hydration data not found' });
        }
    
        // Update the preferences object
        if(glasses) {
          const noTime = 1;
          hydration.preferences = {
            glasses,
            noTime
          };
        } else if (time) {
          const noGlass = 1;
          hydration.preferences = {
            noGlass,
            time
          };
        } else if (glasses && time) {
          hydration.preferences = {
            glasses,
            time
          };
        }
    
        // Save the updated hydration document
        await hydration.save();
    
        res.status(200).json(hydration);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

module.exports = { updatePreferences };