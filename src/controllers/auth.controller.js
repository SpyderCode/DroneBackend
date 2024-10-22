import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const verifyToken = async (req, res) => {
    const token = req.cookies.token;
     if(!token) 
         return res.status(400).json({message: ["No token provided"]});
 
     jwt.verify(token, TOKEN_SECRET, async (err, user) => {
         if(err) return res.status(400).json({message: ["Unauthorized"]});
 
         const userFound = await User.findById(user.id);
         if(!userFound) return res.status(400).json({message: ["Usuario no encontrado"]});
 
         return res.json({
             id: userFound._id,
             username: userFound.username,
             email: userFound.email
         });
     });
 }

export const register = async (req, res) => {
    try {
        console.log(req.body);

        const { username, email, password, role } = req.body;

        

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

        // Encriptar contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        // Crear el usuario
        const newUser = new User({
            username,
            email,
            role,
            password: passwordHash
        });

        const userSaved = await newUser.save();

        // Crear un token de acceso
        const token = createAccessToken({ id: userSaved._id });
        res.cookie('token', token, {
            httpOnly: false,
            sameSite: 'none',
            secure: true
        })
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        });
    } catch (error) {
        console.error(error);
        res.send({message: ["Error al registrar usuario"]});
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Comparar contraseñas
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        // Crear token de acceso
        const token = await createAccessToken({ id: user._id });
        console.log(token);
        res.cookie('token', token, {
            httpOnly: false,
            sameSite: 'none',
            secure: true
        });
        res.json({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({mensaje: ["Error al iniciar session"]})
    }
};



export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        return res.json({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener perfil de usuario' });
    }
};


export const logout = (req, res) => {
    res.cookie("token","", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}
