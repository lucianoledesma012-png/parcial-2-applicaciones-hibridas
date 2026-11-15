const GameModel = require('../models/game.model');
const StudioModel = require('../models/studio.model'); // Importamos el modelo

const getGames = async (req, res) => {
    try {
        const query = {};
        if (req.query.nombre) {
            query.nombre = { $regex: req.query.nombre, $options: 'i' }; 
        }
        if (req.query.genero) {
            query.genero = req.query.genero;
        }
        if (req.query.año) {
            query.año = req.query.año;
        }
        const games = await GameModel.find(query);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los juegos", detalle: error.message });
    }
};

const getGameById = async (req, res) => {
    try {
        const id = req.params.id;
        const game = await GameModel.findById(id);
        if (!game) {
            return res.status(404).json({ error: "Juego no encontrado" });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar el juego. Quizas el formato del ID no es valido." });
    }
};

const createGame = async (req, res) => {
    try {
        if (req.body.studioId) {
            const studioExists = await StudioModel.findById(req.body.studioId);
            if (!studioExists) {
                return res.status(404).json({ error: "El estudio indicado no existe en la base de datos" });
            }
        }

        const newGame = new GameModel(req.body);
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el juego en la base de datos", detalle: error.message });
    }
};

const updateGame = async (req, res) => {
    try {
        const id = req.params.id;

        if (req.body.studioId) {
            const studioExists = await StudioModel.findById(req.body.studioId);
            if (!studioExists) {
                return res.status(404).json({ error: "El nuevo estudio indicado no existe en la base de datos" });
            }
        }

        const updatedGame = await GameModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedGame) {
            return res.status(404).json({ error: "Juego no encontrado" });
        }
        res.status(200).json(updatedGame);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el juego" });
    }
};

const deleteGame = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedGame = await GameModel.findByIdAndDelete(id);
        if (!deletedGame) {
            return res.status(404).json({ error: "Juego no encontrado" });
        }
        res.status(200).json({ message: "Juego eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el juego" });
    }
};

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
};