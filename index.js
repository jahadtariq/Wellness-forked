const express = require('express');
const admin = require('firebase-admin');
const cron = require('node-cron');
const { connectToDatabase } = require('./controllers/connections');
const Users = require('./models/Users');
const bodyParser = require('body-parser');

const Hydration = require('./models/Hydration');
const Medication = require('./models/Medication');

const app = express();

const PORT = process.env.PORT || 3000;
connectToDatabase()
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', async (req, res) => {
    try {
        // Schedule the task using node-cron
        cron.schedule('* * * * *', () => {
            console.log('Scheduler is runing........')
        });
        res.status(200).json({ message: 'Scheduler started successfully' })
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Server Error');
        return;
    }
})

app.post('/post', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const newUser = new Users({
            username, email, password
        })
        await newUser.save();
        res.status(200).json({ message: "User saved successfully" })
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Server Error');
        return;
    }
});


app.post('/api/medication/post', async (req, res) => {
    const {
        userId,
        medicationName,
        dossage,
        frequency,
        startDate,
        endDate
    } = req.body;

    try {
        const newMedication = new Medication({
            userId,
            medicationName,
            dossage,
            frequency,
            startDate,
            endDate
        })

        const timeToNotify = frequency / 24;

        await newMedication.save().then(()=>{
            console.log("Medication Scheduler Running");

            console.log(timeToNotify);

            let string = `0 */${timeToNotify} * * *`

            cron.schedule(string, () => {
                console.log('Dawayi khawoooooooooo........')
            });
        })

        res.status(200).json({ message: 'Medication saved successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Server Error');
        return;
    }
})

app.get('/api/medication/get/:id', async (req, res) => {
    try {
        const medications = await Medication.find({ userId: req.params.id });

        if (!medications) {
            res.status(404).json({ message: 'No medications found' });
        } else {
            res.status(200).json(medications);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Server Error');
    }
});

app.post('/api/hydration/post', async (req, res) => {
    const {
        userId,
        amount,
        notes,
        glasses,
        time
    } = req.body;

    const timeToNotify = glasses / time;

    try {
        const newHydration = new Hydration({
            amount,
            notes,
            userId,
            preferences: {
                glasses,
                time
            }
        })

        await newHydration.save().then(() => {

            console.log(timeToNotify);

            console.log("Hydration Scheduler Running");

            let string = `0 */${timeToNotify} * * *`

            cron.schedule(string, () => {
                console.log('Pani piyoooooo........')
            });
        })
        res.status(200).json({ message: 'Hydration saved successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Server Error');
        return;
    }
})

app.put('/api/panipi/:id', async function (req, res) {
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
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
