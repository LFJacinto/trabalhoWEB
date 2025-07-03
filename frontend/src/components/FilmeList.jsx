import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function FilmeList() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState('');

  const carregar = async () => {
    try {
      const res = await api.get('/filmes', { params: busca ? { titulo: busca } : {} });
      setFilmes(res.data);
      setErro('');
    } catch (e) {
      setErro('Erro ao carregar filmes');
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <input
        placeholder="Buscar por título"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <button onClick={carregar}>Buscar</button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <ul>
        {filmes.map((f) => (
          <li key={f.id}>
            <strong>{f.titulo}</strong> - {f.genero?.nome} - média: {(
              f.avaliacoes?.reduce((sum, a) => sum + a.nota, 0) /
              (f.avaliacoes?.length || 1)
            ).toFixed(1)}{' '}
            <Link to={`/filme/${f.id}`}>ver detalhes</Link> {' '}
            <Link to={`/editar/${f.id}`}>editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
