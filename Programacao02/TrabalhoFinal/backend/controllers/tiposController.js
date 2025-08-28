const db = require('../models/db');

exports.getTipos = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM tiposObjetos');
  res.json(rows);
};

exports.createTipo = async (req, res) => {
  const { nome } = req.body;
  await db.query('INSERT INTO tiposObjetos (nome) VALUES (?)', [nome]);
  res.status(201).send('Tipo criado com sucesso!');
};
