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

  if (!filme) return <div>{erro || 'Carregando...'}</div>;

  return (
    <div>
      <h2>{filme.titulo}</h2>
      <p>{filme.descricao}</p>
      <p>G\u00eanero: {filme.genero?.nome}</p>
      <p>Diretor: {filme.diretor?.nome}</p>
      <h3>Avalia\u00e7\u00f5es</h3>
      <ul>
        {filme.avaliacoes?.map(a => (
          <li key={a.id}>{a.nota} - {a.comentario}</li>
        ))}
      </ul>
      <button onClick={() => navigate(`/editar/${filme.id}`)}>Editar</button>
      <button onClick={remover}>Excluir</button>
    </div>
  );
}
