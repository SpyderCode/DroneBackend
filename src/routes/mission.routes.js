import { Router } from "express";
import * as missionControllers from "../controllers/mission.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Rutas para manejar misiones
router.post('/missions', authRequired, missionControllers.createMission);
router.get('/missions', authRequired, missionControllers.getUserMissions);
router.get('/missions/:missionId', authRequired, missionControllers.getMissionById);
router.put('/missions/:missionId/status', authRequired, missionControllers.updateMissionStatus);
router.put('/missions/:missionId', authRequired, missionControllers.updateMission);
router.delete('/missions/:missionId', authRequired, missionControllers.deleteMission);

export default router;
