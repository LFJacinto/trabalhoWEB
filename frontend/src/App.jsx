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

    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-700 text-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">
            <Link to="/">Catálogo de Filmes</Link>
          </h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:text-indigo-200">Home</Link>
            <Link to="/novo" className="hover:text-indigo-200">Novo Filme</Link>
          </nav>
        </div>
      </header>
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
