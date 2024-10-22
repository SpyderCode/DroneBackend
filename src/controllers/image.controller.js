import Image from '../models/image.model.js';
import Mission from '../models/mission.model.js';

// Crear una nueva imagen para una misión
export const createImage = async (req, res) => {
    try {
        const { url, geolocation, resolution, missionId } = req.body;

        const mission = await Mission.findById(missionId);
        if (!mission) return res.status(404).json({ message: 'Misión no encontrada' });

        const newImage = new Image({
            url,
            geolocation,
            resolution,
            missionId
        });

        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar la imagen' });
    }
};

// Obtener todas las imágenes de una misión específica
export const getImagesByMission = async (req, res) => {
    try {
        const { missionId } = req.params;

        const images = await Image.find({ missionId });
        if (images.length === 0) return res.status(404).json({ message: 'No se encontraron imágenes para esta misión' });

        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener imágenes' });
    }
};

// Eliminar una imagen por ID
export const deleteImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        const image = await Image.findByIdAndDelete(imageId);
        if (!image) return res.status(404).json({ message: 'Imagen no encontrada' });

        res.json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la imagen' });
    }
};


