import { Router } from "express";
import * as controllers from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";

const router = Router();

// Rutas de autenticación
router.post('/register', validateSchema(registerSchema), controllers.register);
router.post('/login', validateSchema(loginSchema), controllers.login);
router.post("/logout", controllers.logout);
router.get("/profile", authRequired, controllers.profile);
router.get("/verifyToken", controllers.verifyToken);

export default router;
