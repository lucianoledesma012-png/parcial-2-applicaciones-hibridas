const validateStudio = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            error: "El cuerpo de la petición está vacío." 
        });
    }

    const { nombre, pais } = req.body;

    if (!nombre || !pais) {
        return res.status(400).json({ 
            error: "Faltan datos obligatorios (nombre, pais)." 
        });
    }

    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
        return res.status(400).json({ error: "El formato del nombre es inválido." });
    }

    if (typeof pais !== 'string' || pais.trim().length === 0) {
        return res.status(400).json({ error: "El formato del país es inválido." });
    }

    next();
};

module.exports = { validateStudio };