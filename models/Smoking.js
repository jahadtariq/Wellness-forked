const mongoose = require('mongoose');

const smokingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true ,unique: true },
    noOfCigarettes: { type: Number },
    totalExpense: {type: Number},
    expense: {type:Number},
    preferences: {
        cigaretteName: String,
        costPerCigarette: Number
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Smoking', smokingSchema);