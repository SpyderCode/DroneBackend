import Mission from '../models/mission.model.js';

// Crear una nueva misión
export const createMission = async (req, res) => {
    try {
        const { name, description, status, droneIds } = req.body;
        const userId = req.user.id; // Usar el ID del usuario autenticado

        const newMission = new Mission({
            name,
            description,
            status,
            userId,
            droneIds
        });

        await newMission.save();
        res.status(201).json(newMission);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear misión' });
    }
};

// Obtener todas las misiones de un usuario
export const getUserMissions = async (req, res) => {
    try {
        const userId = req.user.id;
        //get userid from token from cookies

        console.log(userId);

        const missions = await Mission.find({ userId });
        res.json(missions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener misiones' });
    }
};

// Actualizar el estado de una misión
export const updateMissionStatus = async (req, res) => {
    try {
        const { missionId } = req.params;
        const { status } = req.body;

        const mission = await Mission.findById(missionId);

        if (!mission) return res.status(404).json({ message: 'Misión no encontrada' });

        mission.status = status;
        await mission.save();

        res.json(mission);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado de la misión' });
    }
};

// Obtener una misión específica por ID
export const getMissionById = async (req, res) => {
    try {
        const { missionId } = req.params;

        const mission = await Mission.findById(missionId);
        if (!mission) return res.status(404).json({ message: 'Misión no encontrada' });

        res.json(mission);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la misión' });
    }
};

// Actualizar misión
export const updateMission = async (req, res) => {
    try {
        const { missionId } = req.params;
        const { name, description, status, droneIds } = req.body;
        console.log(name, description, status, droneIds);

        const mission = await Mission.findById(missionId);
        if (!mission) return res.status(404).json({ message: 'Misión no encontrada' });

        mission.name = name;
        mission.description = description;
        mission.status = status;
        mission.droneIds = droneIds;
        await mission.save();

        res.json(mission);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la misión' });
    }
};

// Eliminar misión por ID
export const deleteMission = async (req, res) => {
    try {
        const { missionId } = req.params;

        const mission = await Mission.findByIdAndDelete(missionId);
        if (!mission) return res.status(404).json({ message: 'Misión no encontrada' });

        res.json({ message: 'Misión eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la misión' });
    }
};
