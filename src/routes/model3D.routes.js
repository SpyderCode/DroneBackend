import { Router } from "express";
import * as model3DControllers from "../controllers/model3D.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Rutas para manejar modelos 3D
router.post('/models3D', authRequired, model3DControllers.create3DModel);
router.get('/models3D/:missionId', authRequired, model3DControllers.getModelsByMission);
router.delete('/models3D/:modelId', authRequired, model3DControllers.delete3DModel);

export default router;
