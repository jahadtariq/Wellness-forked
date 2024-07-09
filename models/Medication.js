const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicationName: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    dossage: { type: Number, required: true },
    frequency: { type: Number, required: true },
    notes: { type: String },
    times: [{ type: Date }],
});

module.exports = mongoose.model('Medication', MedicationSchema);