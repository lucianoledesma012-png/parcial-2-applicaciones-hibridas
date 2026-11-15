const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true,
        enum: ['Acción', 'Aventura', 'Terror', 'Deportes', 'RPG', 'Estrategia', 'Supervivencia']
    },
    año: {
        type: Number,
        required: true
    },
    studioId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Studio' 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);