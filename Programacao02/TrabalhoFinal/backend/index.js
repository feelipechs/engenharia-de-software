const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const tiposRoutes = require('./routes/tiposRoutes');
const achadosRoutes = require('./routes/achadosRoutes');

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '5mb' }));

app.use('/tiposObjetos', tiposRoutes);
app.use('/achados', achadosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
