import mongoose from "mongoose";

const droneStatusSchema = mongoose.Schema({
    droneName: {
        type: String,
        required: true
    },
    droneModel: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('DroneStatus', droneStatusSchema);
