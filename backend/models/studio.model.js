const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Studio', studioSchema);