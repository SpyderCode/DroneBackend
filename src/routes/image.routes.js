import { Router } from "express";
import * as imageControllers from "../controllers/image.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Rutas para manejar imágenes
router.post('/images', authRequired, imageControllers.createImage);
router.get('/images/:missionId', authRequired, imageControllers.getImagesByMission);
router.delete('/images/:imageId', authRequired, imageControllers.deleteImage);

export default router;
