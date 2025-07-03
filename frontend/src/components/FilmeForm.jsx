import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const schema = yup.object({
  titulo: yup.string().required('Informe o t\u00edtulo'),
  descricao: yup.string(),
  generoId: yup.number().required('Informe o g\u00eanero'),
  diretorId: yup.number().required('Informe o diretor'),
});

export default function FilmeForm({ edit }) {
  const { id } = useParams();
  const [generos, setGeneros] = useState([]);
  const [diretores, setDiretores] = useState([]);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    api.get('/generos').then(res => setGeneros(res.data));
    api.get('/diretores').then(res => setDiretores(res.data));
    if (edit && id) {
      api.get(`/filmes/${id}`).then(res => {
        setValue('titulo', res.data.titulo);
        setValue('descricao', res.data.descricao);
        setValue('generoId', res.data.genero.id);
        setValue('diretorId', res.data.diretor.id);
      });
    }
  }, [edit, id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (edit && id) {
        await api.put(`/filmes/${id}`, data);
      } else {
        await api.post('/filmes', data);
      }
      navigate('/');
    } catch {
      alert('Erro ao salvar');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>T\u00edtulo</label>
        <input {...register('titulo')} />
        <span>{errors.titulo?.message}</span>
      </div>
      <div>
        <label>Descri\u00e7\u00e3o</label>
        <textarea {...register('descricao')} />
      </div>
      <div>
        <label>G\u00eanero</label>
        <select {...register('generoId')} defaultValue="">
          <option value="" disabled>Selecione</option>
          {generos.map(g => (
            <option key={g.id} value={g.id}>{g.nome}</option>
          ))}
        </select>
        <span>{errors.generoId?.message}</span>
      </div>
      <div>
        <label>Diretor</label>
        <select {...register('diretorId')} defaultValue="">
          <option value="" disabled>Selecione</option>
          {diretores.map(d => (
            <option key={d.id} value={d.id}>{d.nome}</option>
          ))}
        </select>
        <span>{errors.diretorId?.message}</span>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
