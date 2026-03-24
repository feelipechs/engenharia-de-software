import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

import './config/db.js';

import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'views')));

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
