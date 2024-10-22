import Model3D from '../models/model3D.model.js';
import Mission from '../models/mission.model.js';

// Crear un nuevo modelo 3D
export const create3DModel = async (req, res) => {
    try {
        const { url, dimensions, missionId } = req.body;

        const mission = await Mission.findById(missionId);
        if (!mission) return res.status(404).json({ message: 'Misión no encontrada' });

        const newModel3D = new Model3D({
            url,
            dimensions,
            missionId
        });

        await newModel3D.save();
        res.status(201).json(newModel3D);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el modelo 3D' });
    }
};

// Obtener todos los modelos 3D de una misión específica
export const getModelsByMission = async (req, res) => {
    try {
        const { missionId } = req.params;

        const models3D = await Model3D.find({ missionId });
        if (models3D.length === 0) return res.status(404).json({ message: 'No se encontraron modelos 3D para esta misión' });

        res.json(models3D);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener modelos 3D' });
    }
};

// Eliminar un modelo 3D por ID
export const delete3DModel = async (req, res) => {
    try {
        const { modelId } = req.params;

        const model3D = await Model3D.findByIdAndDelete(modelId);
        if (!model3D) return res.status(404).json({ message: 'Modelo 3D no encontrado' });

        res.json({ message: 'Modelo 3D eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el modelo 3D' });
    }
};
