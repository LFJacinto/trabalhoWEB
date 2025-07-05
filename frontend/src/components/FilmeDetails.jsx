import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function FilmeDetails() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/filmes/${id}`)
      .then(res => {
        setFilme(res.data);
        setErro('');
      })
      .catch(() => setErro('Filme n\u00e3o encontrado'));
  }, [id]);

  const remover = async () => {
    if (!window.confirm('Deseja excluir este filme?')) return;
    try {
      await api.delete(`/filmes/${id}`);
      navigate('/');
    } catch {
      alert('Erro ao excluir');
    }
  };

  if (!filme) return <div className="mt-6 text-center">{erro || 'Carregando...'}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-2">{filme.titulo}</h2>
      <p className="mb-4 text-gray-700">{filme.descricao}</p>
      <p className="mb-1"><span className="font-medium">Gênero:</span> {filme.genero?.nome}</p>
      <p className="mb-4"><span className="font-medium">Diretor:</span> {filme.diretor?.nome}</p>
      <h3 className="text-lg font-semibold mb-2">Avaliações</h3>
      <ul className="mb-4 list-disc list-inside space-y-1">
        {filme.avaliacoes?.map(a => (
          <li key={a.id}>{a.nota} - {a.comentario}</li>
        ))}
      </ul>
      <div className="space-x-2">
        <button
          onClick={() => navigate(`/editar/${filme.id}`)}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Editar
        </button>
        <button
          onClick={remover}
          className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
