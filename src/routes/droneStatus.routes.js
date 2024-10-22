import { Router } from "express";
import * as droneStatusControllers from "../controllers/droneStatus.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Rutas para manejar estados del dron
router.get('/droneStatus', authRequired, droneStatusControllers.getAllDroneStatus);
//update
router.put('/droneStatus/:statusId', authRequired, droneStatusControllers.updateDroneStatus);
//get by id
router.get('/droneStatus/:statusId', authRequired, droneStatusControllers.getDroneStatusById);
router.post('/droneStatus', authRequired, droneStatusControllers.createDroneStatus);
router.get('/droneStatus/:missionId', authRequired, droneStatusControllers.getDroneStatusByMission);
router.delete('/droneStatus/:statusId', authRequired, droneStatusControllers.deleteDroneStatus);


export default router;
