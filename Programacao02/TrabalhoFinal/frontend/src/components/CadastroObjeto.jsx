// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// export default function CadastroObjeto() {
//   const [tipos, setTipos] = useState([]);
//   const [dados, setDados] = useState({
//     nomeObjeto: '',
//     localEncontrado: '',
//     dataEncontrado: '',
//     nomePessoaEncontrou: '',
//     observacoes: '',
//     tipoObjetoId: '',
//     urlFoto: ''
//   });
//   const [preview, setPreview] = useState('');

//   useEffect(() => {
//     api.get('/tiposObjetos').then(res => setTipos(res.data));
//   }, []);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setDados(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = e => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//         setDados(prev => ({ ...prev, urlFoto: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     await api.post('/achados', dados);
//     alert('Objeto cadastrado com sucesso!');
//     setDados({ nomeObjeto: '', localEncontrado: '', dataEncontrado: '', nomePessoaEncontrou: '', observacoes: '', tipoObjetoId: '', urlFoto: '' });
//     setPreview('');
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//       <input type="file" onChange={handleImageChange} />
//       {preview && <img src={preview} alt="preview" style={{ width: 100 }} />}
//       <input name="nomeObjeto" value={dados.nomeObjeto} onChange={handleChange} placeholder="Nome do objeto" required />
//       <input name="localEncontrado" value={dados.localEncontrado} onChange={handleChange} placeholder="Local onde foi encontrado" required />
//       <input type="date" name="dataEncontrado" value={dados.dataEncontrado} onChange={handleChange} required />
//       <input name="nomePessoaEncontrou" value={dados.nomePessoaEncontrou} onChange={handleChange} placeholder="Quem encontrou?" required />
//       <textarea name="observacoes" value={dados.observacoes} onChange={handleChange} placeholder="Observações" />
//       <select name="tipoObjetoId" value={dados.tipoObjetoId} onChange={handleChange} required>
//         <option value="">Escolha o tipo do objeto</option>
//         {tipos.map(t => (
//           <option key={t.id} value={t.id}>{t.nome}</option>
//         ))}
//       </select>
//       <button type="submit">Salvar</button>
//     </form>
//   );
// }
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card
} from 'react-bootstrap';

export default function CadastroObjeto() {
  const [tipos, setTipos] = useState([]);
  const [dados, setDados] = useState({
    nomeObjeto: '',
    localEncontrado: '',
    dataEncontrado: '',
    nomePessoaEncontrou: '',
    observacoes: '',
    tipoObjetoId: '',
    urlFoto: ''
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    api.get('/tiposObjetos').then(res => setTipos(res.data));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setDados(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setDados(prev => ({ ...prev, urlFoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // const handleImageChange = e => {
  //   const file = e.target.files[0];
    
  //   if (file) {
  //     const maxSize = 45 * 1024; // 45KB
      
  //     // Verifica se o tamanho do arquivo excede o limite
  //     if (file.size > maxSize) {
  //       alert("A imagem deve ter no máximo 45KB.");
  //       return; // Impede que o código continue e o arquivo seja processado
  //     }
      
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result);
  //       setDados(prev => ({ ...prev, urlFoto: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/achados', dados);
    alert('Objeto cadastrado com sucesso!');
    setDados({
      nomeObjeto: '',
      localEncontrado: '',
      dataEncontrado: '',
      nomePessoaEncontrou: '',
      observacoes: '',
      tipoObjetoId: '',
      urlFoto: ''
    });
    setPreview('');
  };

  return (
    <Container className="my-5">
      <Card className="shadow p-4">
        <h3 className="mb-4 text-center text-primary">Registrar Objeto Encontrado</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Foto do Objeto</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-3"
                style={{ width: 150, borderRadius: 8 }}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nome do Objeto</Form.Label>
            <Form.Control
              name="nomeObjeto"
              value={dados.nomeObjeto}
              onChange={handleChange}
              required
              placeholder="Ex: Guarda-chuva azul"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Local onde foi encontrado</Form.Label>
            <Form.Control
              name="localEncontrado"
              value={dados.localEncontrado}
              onChange={handleChange}
              required
              placeholder="Ex: Sala 104"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  name="dataEncontrado"
                  value={dados.dataEncontrado}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quem encontrou?</Form.Label>
                <Form.Control
                  name="nomePessoaEncontrou"
                  value={dados.nomePessoaEncontrou}
                  onChange={handleChange}
                  required
                  placeholder="Ex: João da Silva"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="observacoes"
              value={dados.observacoes}
              onChange={handleChange}
              placeholder="Detalhes importantes sobre o objeto"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Tipo do Objeto</Form.Label>
            <Form.Select
              name="tipoObjetoId"
              value={dados.tipoObjetoId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um tipo</option>
              {tipos.map(t => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Salvar Objeto
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
