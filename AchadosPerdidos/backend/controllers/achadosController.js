const db = require('../models/db');

exports.getAchados = async (req, res) => {
  const [rows] = await db.query(`
    SELECT a.*, t.nome AS tipoNome 
    FROM achados a 
    JOIN tiposObjetos t ON a.tipoObjetoId = t.id
    ORDER BY a.dataEncontrado DESC
  `);
  res.json(rows);
};

exports.createAchado = async (req, res) => {
  const {
    nomeObjeto,
    localEncontrado,
    dataEncontrado,
    nomePessoaEncontrou,
    urlFoto,
    observacoes,
    tipoObjetoId
  } = req.body;

  const [[tipoObjeto]] = await db.query('SELECT * FROM tiposObjetos WHERE id = ?', [tipoObjetoId]);

  if (!tipoObjeto) {
    return res.status(400).json({ error: 'tipoObjetoId inválido' });
  }

  await db.query(`
    INSERT INTO achados 
    (nomeObjeto, localEncontrado, dataEncontrado, nomePessoaEncontrou, urlFoto, observacoes, tipoObjetoId) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nomeObjeto, localEncontrado, dataEncontrado, nomePessoaEncontrou, urlFoto, observacoes, tipoObjetoId]);

  res.status(201).send('Objeto cadastrado!');
};

exports.deleteAchado = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM achados WHERE id = ?', [id]);
  res.send('Objeto removido.');
};
