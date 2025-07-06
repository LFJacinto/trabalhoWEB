import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function FilmeForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [generoId, setGeneroId] = useState('');
  const [diretorId, setDiretorId] = useState('');
  const [generos, setGeneros] = useState([]);
  const [diretores, setDiretores] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = async () => {
    try {
      const [resGeneros, resDiretores] = await Promise.all([
        api.get('/generos'),
        api.get('/diretores'),
      ]);
      setGeneros(resGeneros.data);
      setDiretores(resDiretores.data);
    } catch {
      setErro('Erro ao carregar gêneros ou diretores');
    }

    if (edit) {
      try {
        const res = await api.get(`/filmes/${id}`);
        const filme = res.data;
        setTitulo(filme.titulo);
        setDescricao(filme.descricao);
        setGeneroId(filme.genero?.id);
        setDiretorId(filme.diretor?.id);
      } catch {
        setErro('Erro ao carregar filme');
      }
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    try {
      const dto = { titulo, descricao, generoId, diretorId };
      if (edit) {
        await api.put(`/filmes/${id}`, dto);
      } else {
        await api.post('/filmes', dto);
      }
      navigate('/');
    } catch {
      setErro('Erro ao salvar filme');
    }
  };

  return (

    <div className="film-form">

      <div className="max-w-xl mx-auto mt-10 px-4 bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-6">{edit ? 'Editar Filme' : 'Novo Filme'}</h1>


      {erro && <p className="error">{erro}</p>}

      <div className="form-group">
        <label>Título</label>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Gênero</label>
        <select
          value={generoId}
          onChange={(e) => setGeneroId(e.target.value)}
        >
          <option value="">Selecione</option>
          {generos.map((g) => (
            <option key={g.id} value={g.id}>{g.nome}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Diretor</label>
        <select
          value={diretorId}
          onChange={(e) => setDiretorId(e.target.value)}
        >
          <option value="">Selecione</option>
          {diretores.map((d) => (
            <option key={d.id} value={d.id}>{d.nome}</option>
          ))}
        </select>
        </div>
      </div>

      <button onClick={salvar} className="btn btn-primary">Salvar</button>
    </div>
  );
}
