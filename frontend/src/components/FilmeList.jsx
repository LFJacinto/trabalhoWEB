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
    <div className="list-page">
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Buscar por título"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button onClick={carregar} className="btn btn-primary">
          Buscar
        </button>
      </div>
      {erro && <p className="error">{erro}</p>}
      <table className="film-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Gênero</th>
            <th>Média</th>
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map((f) => (
            <tr key={f.id}>
              <td>{f.titulo}</td>
              <td>{f.genero?.nome}</td>
              <td>
                {(
                  f.avaliacoes?.reduce((sum, a) => sum + a.nota, 0) /
                  (f.avaliacoes?.length || 1)
                ).toFixed(1)}
              </td>
              <td className="actions">
                <Link to={`/filme/${f.id}`}>ver detalhes</Link>
                <Link to={`/editar/${f.id}`}>editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
