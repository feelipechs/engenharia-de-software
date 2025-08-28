// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import CadastroObjeto from './components/CadastroObjeto';
// import ListaObjetos from './components/ListaObjetos';

// function App() {
//   return (
//     <Router>
//       <nav style={{ display: 'flex', gap: '10px', margin: '10px' }}>
//         <Link to="/">Lista</Link>
//         <Link to="/cadastro">Cadastrar</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<ListaObjetos />} />
//         <Route path="/cadastro" element={<CadastroObjeto />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { Routes, Route } from 'react-router-dom';
import ListaObjetos from './components/ListaObjetos';
import CadastroObjeto from './components/CadastroObjeto';
import ObjetosDoUsuario from './components/ObjetosDoUsuario';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ListaObjetos />} />
        <Route path="/registrar" element={<CadastroObjeto />} />
        <Route path="/meu-objeto" element={<ObjetosDoUsuario />} />
      </Routes>
    </div>
  );
}

export default App;
