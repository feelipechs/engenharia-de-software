import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import api from '../services/api';

export default function ObjetosDoUsuario() {
  const [objetos, setObjetos] = useState([]);

  useEffect(() => {
    buscarObjetos();
  }, []);

  const buscarObjetos = () => {
    api.get('/achados').then(res => setObjetos(res.data));
  };

  const remover = async (id) => {
    await api.delete(`/achados/${id}`);
    buscarObjetos();
  };

  return (
    <Container className="mt-4">
      <h2>Meus Objetos Encontrados</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Local</th>
            <th>Data</th>
            <th>Encontrado por</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {objetos.map(obj => (
            <tr key={obj.id}>
              <td>
                <img src={obj.urlFoto} alt={obj.nomeObjeto} style={{ width: '80px' }} />
              </td>
              <td>{obj.nomeObjeto}</td>
              <td>{obj.localEncontrado}</td>
              <td>{new Date(obj.dataEncontrado).toLocaleDateString()}</td>
              <td>{obj.nomePessoaEncontrou}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => remover(obj.id)}>
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
