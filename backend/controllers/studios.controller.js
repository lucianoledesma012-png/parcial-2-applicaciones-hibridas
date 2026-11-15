const StudioModel = require('../models/studio.model.js');

const getStudios = async (req, res) => {
    try {
        const studios = await StudioModel.find();
        res.status(200).json(studios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los estudios", detalle: error.message });
    }
};

const getStudioById = async (req, res) => {
    try {
        const id = req.params.id;
        const studio = await StudioModel.findById(id);
        if (!studio) {
            return res.status(404).json({ error: "Estudio no encontrado" });
        }
        res.status(200).json(studio);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar el estudio", detalle: error.message });
    }
};

const createStudio = async (req, res) => {
    try {
        if (!req.body || !req.body.nombre) {
            return res.status(400).json({ error: "El nombre del estudio es obligatorio" });
        }        
        const newStudio = new StudioModel(req.body);

        const savedStudio = await newStudio.save();
        res.status(201).json(savedStudio);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el estudio", detalle: error.message });
    }
};

const updateStudio = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedStudio = await StudioModel.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedStudio) {
            return res.status(404).json({ error: "Estudio no encontrado" });
        }
        res.status(200).json(updatedStudio);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el estudio", detalle: error.message });
    }
};

const deleteStudio = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedStudio = await StudioModel.findByIdAndDelete(id);
        
        if (!deletedStudio) {
            return res.status(404).json({ error: "Estudio no encontrado" });
        }
        res.status(200).json({ message: "Estudio eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el estudio", detalle: error.message });
    }
};

module.exports = {
    getStudios,
    getStudioById,
    createStudio,
    updateStudio,
    deleteStudio
};