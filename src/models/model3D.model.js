import mongoose from "mongoose";

const model3DSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    generationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    dimensions: {
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

export default mongoose.model('3DModel', model3DSchema);
