import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// IMPORTAÇÃO DOS MODELS E INSTÂNCIA DO SEQUELIZE
// Este 'db' agora contém a instância do Sequelize e todos os Models (Aluno, Curso, Inscricao)
import db from './models/index.js'; // Assumindo que você criou models/index.js

import alunoRoutes from './routes/alunoRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import inscricaoRoutes from './routes/inscricaoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000; // Bom ter um fallback

// ----------------------------------------------------
// 1. MIDDLEWARES (Onde ficam os app.use() globais)
// ----------------------------------------------------
app.use(express.json());
// Você pode adicionar mais aqui:
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// ----------------------------------------------------

// ----------------------------------------------------
// 2. ASSOCIAÇÃO DAS ROTAS (Onde ficam os app.use('/caminho', router))
// ----------------------------------------------------
app.use('/alunos', alunoRoutes);
app.use('/cursos', cursoRoutes);
app.use('/inscricoes', inscricaoRoutes);

// tratar rotas não encontradas (Este é um middleware de erro final)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});
// ----------------------------------------------------

// ----------------------------------------------------
// 3. INICIALIZAÇÃO DO SERVIDOR E DB
// ----------------------------------------------------
// Primeiro, sincroniza o banco de dados. Isso cria as tabelas (Alunos, Cursos, Inscricoes)
db.sequelize
  .sync({ force: false }) // Use force: true APENAS em desenvolvimento.
  .then(() => {
    console.log('Banco de dados sincronizado e tabelas criadas!');

    // Depois de sincronizado, inicia o servidor HTTP
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // Se houver erro no banco (ex: problema de conexão/permissão), a aplicação deve falhar
    console.error('Erro ao sincronizar o banco:', err);
    process.exit(1);
  });
