const Sleep = require("../../models/Sleep");
// Add/Update Sleep Schedule
async function updateSleep(req, res) 
{
    const { userId } = req.params.userId;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

  try {
    let sleepSchedule = await Sleep.findOne({ userId });

    if (!sleepSchedule) {
      sleepSchedule = new Sleep({
        userId,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
      });
    } else {
      sleepSchedule.monday = monday;
      sleepSchedule.tuesday = tuesday;
      sleepSchedule.wednesday = wednesday;
      sleepSchedule.thursday = thursday;
      sleepSchedule.friday = friday;
      sleepSchedule.saturday = saturday;
      sleepSchedule.sunday = sunday;
    }

    await sleepSchedule.save();

    res.status(200).json({
      message: 'Sleep schedule updated successfully',
      data: sleepSchedule
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating sleep schedule' });
  }
};

// Get Sleep Schedule
// router.get('/api/sleep-schedule/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const sleepSchedule = await Sleep.findOne({ userId });

//     if (!sleepSchedule) {
//       return res.status(404).json({ message: 'Sleep schedule not found' });
//     }

//     res.status(200).json({
//       message: 'Sleep schedule retrieved successfully',
//       data: sleepSchedule
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error retrieving sleep schedule' });
//   }
// });

module.exports = {updateSleep};