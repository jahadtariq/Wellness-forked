async function sendPushNotification(token, title, body) {
    try {
        const message = {
            token: token,
            notification: {
                title: title,
                body: body,
            },
        };

        // Send a message to the device corresponding to the provided registration token
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
