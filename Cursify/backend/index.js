import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// inicia servidor, configura ambiente, conecta ao banco de dados e registra rotas e middlewares
import './config/db.js'; 

import alunoRoutes from './routes/alunoRoutes.js'
import cursoRoutes from './routes/cursoRoutes.js'
import inscricaoRoutes from './routes/inscricaoRoutes.js'

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());

// associação das rotas
app.use('/alunos', alunoRoutes);
app.use('/cursos', cursoRoutes);
app.use('/inscricoes', inscricaoRoutes);

// tratar rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

// iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});