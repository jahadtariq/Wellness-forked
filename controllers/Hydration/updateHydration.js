// Mini-Application Hydration Controller
const Activity = require('../../models/Activity');
const Hydration = require('../../models/Hydration');

const { Queue } = require('bullmq');
const Redis = require('ioredis');

// Redis connection
const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
});

// Create a new queue and scheduler for notifications
const notificationQueue = new Queue('notificationQueue', { connection });


async function updateHydration(req, res) {
  const { id } = req.params;
  const { userId, amount, glasses, time } = req.body;

  try {
    let userTrackRecord = await Hydration.findOne({ userId: id });

    if (userTrackRecord) {
      // Update the existing hydration record
      userTrackRecord.amount += 1;
      userTrackRecord.totallNumberOfGlasses += 1;
      await userTrackRecord.save();

      // Update or create the activity log for hydration
      let todaysActivity = await Activity.findOne({ userId: id, activity: 'HydrationActivity' });
      const progress = (userTrackRecord.amount / userTrackRecord.preferences.glasses) * 100;

      if (todaysActivity) {
        todaysActivity.progress = progress;
        await todaysActivity.save();
      } else {
        const activityLog = new Activity({
          userId: id,
          activity: 'HydrationActivity',
          progress: progress
        });
        await activityLog.save();
      }

      // Calculate the water intake interval
    //   const interval = 14 / glasses;

      // Set the scheduled notifications
    //   await setScheduledNotifications(userTrackRecord, glasses);

    // Set the scheduled notifications
    await setScheduledNotifications(userTrackRecord, glasses, time);

      res.status(200).json({ message: "Hydration Updated" });
    } else {
      // Create a new hydration record
      const newHydration = new Hydration({
        userId,
        amount,
        totallNumberOfGlasses: amount,
        preferences: {
          glasses,
          time
        }
      });

      await newHydration.save();

      const activityLog = new Activity({
        userId: id,
        activity: 'HydrationActivity',
        progress: (amount / glasses) * 100
      });

      await activityLog.save();

    //   const interval = 14 / glasses;

      // Set the water intake interval and scheduled notifications
    //   await setScheduledNotifications(newHydration, glasses);

    // Set the scheduled notifications
    await setScheduledNotifications(userTrackRecord, glasses, time);

      res.status(200).json({ message: "Hydration tracking saved successfully" });
    }
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send('Server Error');
  }
}

async function setScheduledNotifications(hydrationRecord, glasses, time) {
    const { userId  } = hydrationRecord;
  
    // Calculate the start and end times for the notification window (9 AM to 10 PM)
    const startTime = new Date().setHours(14, 0, 0, 0);
    // const endTime = new Date().setHours(22, 0, 0, 0);
  
    // Calculate the interval between notifications
    // const interval = (endTime - startTime) / (glasses * 60 * 60 * 1000); // in hours
    const interval = glasses / time;
  
    // Schedule the notifications
    for (let i = 0; i < glasses; i++) {
      const notificationTime = new Date(startTime + i * interval * 60 * 60 * 1000);
  
      // Console log the notification

      console.log("         ");

      console.log({
        userId: userId.toString(),
        title: 'Time to Hydrate',
        message: `It's time to drink a glass of water`,
        type: 'info',
        miniAppId: 'hydration',
        scheduledTime: notificationTime.toISOString()
      });

      console.log("         ");

      // Calculate the delay in milliseconds
      console.log(notificationTime);
      const delay = new Date(notificationTime).getTime() - new Date().getTime();

      console.log(delay);

      if (delay <= 0) {
        return res.status(400).json({ message: 'Scheduled time must be in the future' });
      }


      await notificationQueue.add(
        'sendNotification',
        {
          userId: userId.toString(),
          title: 'Time to Hydrate',
          message: `It's time to drink a glass of water`,
          type: 'info',
          miniAppId: 'hydration',
          scheduledTime: notificationTime.toISOString()
        },
        { 
          delay
        }
      );

      console.log("Notification Added to Queue.");
      console.log("         ");

    }
  }

module.exports = { updateHydration };