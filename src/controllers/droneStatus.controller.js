import DroneStatus from '../models/droneStatus.model.js';

// Create a new drone status with only the drone name and model
export const createDroneStatus = async (req, res) => {
    try {
        const { droneName, droneModel } = req.body;
        const userId = req.user.id;
        console.log(droneName, droneModel, userId);

        const newDroneStatus = new DroneStatus({
            droneName,
            droneModel,
            userId
        });

        await newDroneStatus.save();
        res.status(201).json(newDroneStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error creating drone status' });
    }
};


    

// Obtener el estado del dron por ID de misión
export const getDroneStatusByMission = async (req, res) => {
    try {
        const { missionId } = req.params;

        const droneStatus = await DroneStatus.find({ missionId });
        if (droneStatus.length === 0) return res.status(404).json({ message: 'No se encontraron estados del dron para esta misión' });

        res.json(droneStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el estado del dron' });
    }
};

// Eliminar un estado del dron por ID
export const deleteDroneStatus = async (req, res) => {
    try {
        const { statusId } = req.params;

        const droneStatus = await DroneStatus.findByIdAndDelete(statusId);
        if (!droneStatus) return res.status(404).json({ message: 'Estado del dron no encontrado' });

        res.json({ message: 'Estado del dron eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el estado del dron' });
    }
};

//get all drone status
export const getAllDroneStatus = async (req, res) => {
    try {
        const droneStatus = await DroneStatus.find();
        res.json(droneStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estados del dron' });
    }
};

//update drone status
export const updateDroneStatus = async (req, res) => {
    try {
        const { droneName, droneModel } = req.body;

        //Update just the droneName and model
        const droneStatus = await DroneStatus.findByIdAndUpdate(req.params.statusId, {
            droneName,
            droneModel
        }, { new: true });
        res.json(droneStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del dron' });
    }
};

//get drone status by id
export const getDroneStatusById = async (req, res) => {
    try {
        const { statusId } = req.params;

        const droneStatus = await DroneStatus.findById(statusId);
        if (!droneStatus) return res.status(404).json({ message: 'Estado del dron no encontrado' });

        res.json(droneStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el estado del dron' });
    }
};
