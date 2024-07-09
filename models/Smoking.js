const mongoose = require('mongoose');

const smokingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true ,unique: true },
    cigarettes: { type: Number },
    date: {type: Date}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Smoking', smokingSchema);