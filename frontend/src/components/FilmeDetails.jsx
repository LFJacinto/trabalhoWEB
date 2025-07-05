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

  if (!filme) return <div className="main-content">{erro || 'Carregando...'}</div>;


  return (
    <div className="film-details">
      <h2>{filme.titulo}</h2>
      <p>{filme.descricao}</p>
      <p><strong>Gênero:</strong> {filme.genero?.nome}</p>
      <p><strong>Diretor:</strong> {filme.diretor?.nome}</p>
      <h3>Avaliações</h3>
      <ul>
        {filme.avaliacoes?.map(a => (
          <li key={a.id}>{a.nota} - {a.comentario}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => navigate(`/editar/${filme.id}`)} className="btn btn-primary">Editar</button>
        <button onClick={remover} className="btn btn-danger" style={{ marginLeft: '8px' }}>Excluir</button>
      </div>
    </div>
  );
}
