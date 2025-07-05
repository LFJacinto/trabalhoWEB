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
    <div className="max-w-3xl mx-auto mt-6">
      <div className="flex mb-4">
        <input
          className="flex-1 border border-gray-300 rounded-l px-3 py-2"
          placeholder="Buscar por título"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button
          onClick={carregar}
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
      {erro && <p className="text-red-600 mb-4">{erro}</p>}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Gênero</th>
              <th className="px-4 py-2">Média</th>
              <th className="px-4 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="px-4 py-2 font-medium">{f.titulo}</td>
                <td className="px-4 py-2">{f.genero?.nome}</td>
                <td className="px-4 py-2">
                  {(
                    f.avaliacoes?.reduce((sum, a) => sum + a.nota, 0) /
                    (f.avaliacoes?.length || 1)
                  ).toFixed(1)}
                </td>
                <td className="px-4 py-2 space-x-2 text-right">
                  <Link
                    to={`/filme/${f.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    ver detalhes
                  </Link>
                  <Link
                    to={`/editar/${f.id}`}
                    className="text-green-600 hover:underline"
                  >
                    editar
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
