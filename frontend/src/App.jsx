import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import FilmeList from './components/FilmeList';
import FilmeDetails from './components/FilmeDetails';
import FilmeForm from './components/FilmeForm';

export default function App() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Catálogo de Filmes</h1>
      <nav>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/novo')}>Novo Filme</button>
      </nav>
      <Routes>
        <Route path="/" element={<FilmeList />} />
        <Route path="/filme/:id" element={<FilmeDetails />} />
        <Route path="/editar/:id" element={<FilmeForm edit />} />
        <Route path="/novo" element={<FilmeForm />} />
      </Routes>
    </div>
  );
}
