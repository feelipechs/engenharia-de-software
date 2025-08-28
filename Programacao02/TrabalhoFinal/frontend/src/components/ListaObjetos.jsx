// import React, { useEffect, useState } from 'react';
// import api from '../services/api';

// export default function ListaObjetos() {
//   const [objetos, setObjetos] = useState([]);

//   useEffect(() => {
//     buscarObjetos();
//   }, []);

//   const buscarObjetos = () => {
//     api.get('/achados').then(res => setObjetos(res.data));
//   };

//   const remover = async (id) => {
//     await api.delete(`/achados/${id}`);
//     buscarObjetos();
//   };

//   return (
//     <div>
//       {objetos.map(obj => (
//         <div key={obj.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
//           <img src={obj.urlFoto} alt={obj.nomeObjeto} style={{ width: 100 }} />
//           <h3>{obj.nomeObjeto}</h3>
//           <p><strong>Local:</strong> {obj.localEncontrado}</p>
//           <p><strong>Data:</strong> {new Date(obj.dataEncontrado).toLocaleDateString()}</p>
//           <p><strong>Por:</strong> {obj.nomePessoaEncontrou}</p>
//           <p><strong>Status:</strong> Aguardando</p>
//           {obj.observacoes && <p><strong>Observação:</strong> {obj.observacoes}</p>}
//           <button onClick={() => remover(obj.id)}>Remover</button>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

export default function ListaObjetos() {
  const [objetos, setObjetos] = useState([]);

  useEffect(() => {
    buscarObjetos();
  }, []);

  const buscarObjetos = () => {
    api.get('/achados').then(res => setObjetos(res.data));
  };

  return (
    <Container className="mt-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {objetos.map(obj => (
          <Col key={obj.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={obj.urlFoto}
                alt={obj.nomeObjeto}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{obj.nomeObjeto}</Card.Title>
                <Card.Text><strong>Local:</strong> {obj.localEncontrado}</Card.Text>
                <Card.Text><strong>Data:</strong> {new Date(obj.dataEncontrado).toLocaleDateString()}</Card.Text>
                <Card.Text><strong>Por:</strong> {obj.nomePessoaEncontrou}</Card.Text>
                <Card.Text><strong>Status:</strong> Aguardando</Card.Text>
                {obj.observacoes && (
                  <Card.Text><strong>Observações:</strong> {obj.observacoes}</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
