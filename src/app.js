import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser"
import cors from 'cors';

import authRoutes from './routes/auth.routes.js'
import missionRoutes from './routes/mission.routes.js'
import imageRoutes from './routes/image.routes.js'
import model3DRoutes from './routes/model3D.routes.js'
import droneStatus from './routes/droneStatus.routes.js'


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173',
    'http://localhost/productos',
    'http://localhost',
    'http://127.0.0.1/productos',
    'http://127.0.0.1:5173',
    'https://dronefrontend.onrender.com'
    ],
    credentials: true
}));

app.use('/api/auth/', authRoutes);
app.use('/api/', missionRoutes);
app.use('/api/', imageRoutes);
app.use('/api/', model3DRoutes);
app.use('/api/', droneStatus);


export default app; 