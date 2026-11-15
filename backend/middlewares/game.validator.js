const mongoose = require('mongoose'); 

const validateGame = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            error: "El cuerpo de la petición está vacío o no tiene el formato correcto." 
        });
    }

    const { nombre, genero, año, studioId } = req.body;

    if (!nombre || !genero || !año || !studioId) {
        return res.status(400).json({ 
            error: "Faltan datos obligatorios (nombre, genero, año, studioId)." 
        });
    }

    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
        return res.status(400).json({ error: "El formato del nombre es inválido." });
    }

    if (typeof genero !== 'string' || genero.trim().length === 0) {
        return res.status(400).json({ error: "El formato del género es inválido." });
    }

    const añoNumerico = Number(año);
    const añoMaximo = new Date().getFullYear() + 2; 

    if (isNaN(añoNumerico) || añoNumerico < 1950 || añoNumerico > añoMaximo) {
        return res.status(400).json({ 
            error: `El año debe ser un número válido entre 1950 y ${añoMaximo}.` 
        });
    }

    if (!mongoose.Types.ObjectId.isValid(studioId)) {
        return res.status(400).json({ error: "El ID del estudio proporcionado no tiene un formato válido." });
    }
    
    next();
};

module.exports = { validateGame };