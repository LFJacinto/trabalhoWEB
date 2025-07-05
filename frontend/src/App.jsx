import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FilmeList from './components/FilmeList';
import FilmeDetails from './components/FilmeDetails';
import FilmeForm from './components/FilmeForm';

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-content">
          <h1 className="logo">
            <Link to="/">Catálogo de Filmes</Link>
          </h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/novo">Novo Filme</Link>
          </nav>
        </div>
      </header>
      <main className="container main-content">
        <Routes>
          <Route path="/" element={<FilmeList />} />
          <Route path="/filme/:id" element={<FilmeDetails />} />
          <Route path="/editar/:id" element={<FilmeForm edit />} />
          <Route path="/novo" element={<FilmeForm />} />
        </Routes>
      </main>
    </div>
  );
}
