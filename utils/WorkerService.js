const { Worker } = require('bullmq');
const Redis = require('ioredis');


// Redis connection
const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
});

const notificationWorker = new Worker(
  'notificationQueue',
  job => {
    const { userId, title, message, type, miniAppId } = job.data;
    console.log(`Notification sent to user ${userId}`);
  },
  {
    connection,
  }
);

console.log("Worker Started ....");
console.log("The notification will be pushed after completing its delay....");

notificationWorker.on('completed', job => {
  console.log(`Job completed with result ${job.returnvalue}`);
});

notificationWorker.on('failed', (job, err) => {
  console.log(`Job failed with error ${err.message}`);
});
