import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    captureDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    geolocation: {
        type: {
            lat: {
                type: Number,
                required: true
            },
            long: {
                type: Number,
                required: true
            }
        },
        required: true
    },
    resolution: {
        type: String,
        required: true
    },
    missionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Image', imageSchema);
