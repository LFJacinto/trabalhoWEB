import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FilmeList from './components/FilmeList';
import FilmeDetails from './components/FilmeDetails';
import FilmeForm from './components/FilmeForm';

export default function App() {
  return (
      <div className="min-h-screen bg-gray-100">
        {/* Cabeçalho */}
        <header className="bg-indigo-700 shadow">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <h1 className="text-xl font-bold">
              <Link to="/">Catálogo de Filmes</Link>
            </h1>
              <nav className="flex gap-4">
                  <Link to="/" className="text-black hover:text-indigo-500 transition-colors">Home</Link>
                  <Link to="/novo" className="text-black hover:text-indigo-500 transition-colors">Novo Filme</Link>
              </nav>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="container mx-auto p-4">
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
