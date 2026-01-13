const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    tokenNo: {
        type: Number,
        required: true,
        unique: true
    },
    mrid: {
        type: String,
        required: true
    },
    estimatedTime: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Token', tokenSchema);