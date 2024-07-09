const mongoose = require('mongoose');

const hydrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true ,unique: true },
    amount: { type: Number, default: 0 }, // in bo of glasses
    notes: { type: String },
    preferences: { glasses: Number, time: Number}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Hydration', hydrationSchema);