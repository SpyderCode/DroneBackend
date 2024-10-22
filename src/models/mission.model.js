import mongoose from "mongoose";

const missionSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'aborted'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    droneIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DroneStatus',
        required: true,
      }],
}, {
    timestamps: true
});

export default mongoose.model('Mission', missionSchema);
