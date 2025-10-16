import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Plans from './pages/Plans';
import Courses from './pages/Courses';
import Sac from './pages/Sac';
import Profile from './pages/Profile';
import Management from './pages/Management';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/cursos" element={<Courses />} />
        <Route path="/planos" element={<Plans />} />
        <Route path="/sac" element={<Sac />} />
        <Route path="/configuracoes/perfil" element={<Profile />} />
        <Route path="/admin/gerenciamento" element={<Management />} />
      </Routes>
    </Router>
  );
}

export default App;
