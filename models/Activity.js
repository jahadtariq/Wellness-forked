const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true ,
        unique: true 
    },
    hydration: {
        date: {
            type: Date,
            required: true,
        },
        progress: {
            type: Number,
            default: 0
        }
    },
    smoking: {
        date: {
            type: Date,
            required: true,
        },
        expense: {
            type: Number,
            default: 0
        }
    },
    workouts: [
        {
          date: {
            type: Date,
            required: true
          },
          type: {
            type: String,
            required: true
          },
          duration: {
            type: Number,
            required: true
          },
          progress: {
            type: Number,
            default: 0
          }
        }
    ]
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Activity', activitySchema);