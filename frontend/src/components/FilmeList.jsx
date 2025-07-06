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

  const buscar = async () => {
    try {
      const res = await api.get('/filmes', { params: { titulo: busca } });
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
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">🎬 Catálogo de Filmes</h1>

        <div className="flex mb-6">
          <input
              className="flex-1 border border-gray-300 rounded-l px-4 py-2"
              placeholder="Buscar por título..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
          />
          <button
              onClick={buscar}
              className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700 transition"
          >
            Buscar
          </button>
        </div>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-2 font-semibold">Título</th>
              <th className="px-4 py-2 font-semibold">Gênero</th>
              <th className="px-4 py-2 font-semibold">Média</th>
              <th className="px-4 py-2 font-semibold text-right">Ações</th>
            </tr>
            </thead>
            <tbody>
            {filmes.map((f) => (
                <tr key={f.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{f.titulo}</td>
                  <td className="px-4 py-2">{f.genero?.nome}</td>
                  <td className="px-4 py-2">
                    {(
                        f.avaliacoes?.reduce((sum, a) => sum + a.nota, 0) /
                        (f.avaliacoes?.length || 1)
                    ).toFixed(1)}
                  </td>
                  <td className="px-4 py-2 text-right space-x-3">
                    <Link to={`/filme/${f.id}`} className="text-blue-600 hover:underline">
                      Ver Detalhes  &nbsp;
                    </Link>
                    <Link to={`/editar/${f.id}`} className="text-green-600 hover:underline">
                      Editar &nbsp;
                    </Link>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
