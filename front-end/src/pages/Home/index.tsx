import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import {
  Header,
  Container,
  FormContainer,
  SweepstakesContainer,
  SweepstakesList,
  SweepstakesListItem,
  SweepstakeStatus,
} from './styles';

interface Sweepstake {
  id: number;
  title: string;
  description: string;
  status: number;
}

const Home: React.FC = () => {
  const [sweepstakes, setSweepstakes] = useState<Sweepstake[]>([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/sweepstakes');
      setSweepstakes(response.data);
    }

    loadData();
  }, []);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(state => ({ ...state, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    if (formData.title.trim() === '' || formData.description.trim() === '') {
      alert('Name and e-mail fields can\'t be empty.');
      return;
    }

    try {
      const response = await api.post('/sweepstakes', formData);
      setSweepstakes(state => ([...state, response.data]));
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      const formElement = event.target as HTMLFormElement;
      formElement.reset();
    }
  }, [formData]);

  const handleDeleteSweepstake = useCallback(async (id: number) => {
    try {
      await api.delete(`/sweepstakes/${id}`);
      setSweepstakes(state => state.filter(sweepstake => sweepstake.id !== id));
    } catch (err) {
      alert(err.response.data.message);
    }
  }, []);

  return (
    <>
      <Header>
        <h1>Amigo Secreto!</h1>
        <span>Organize seus amigos secretos com essa aplicação</span>
      </Header>

      <Container>
        <FormContainer onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Título" name="title" onChange={handleInputChange} />
          <input type="text" placeholder="Descrição" name="description" onChange={handleInputChange} />

          <button type="submit">
            <FiPlus size={24} />
            Criar novo amigo secreto
          </button>
        </FormContainer>

        <SweepstakesContainer>
          <h2>Amigos secretos cadastrados ({sweepstakes.length})</h2>


          <SweepstakesList>
            {sweepstakes.map(sweepstake => (
              <SweepstakesListItem key={`${sweepstake.id}-${new Date().getTime()}`}>
                <div>
                  <strong>{sweepstake.title}</strong>
                  <span>{sweepstake.description}</span>
                </div>

                <SweepstakeStatus status={sweepstake.status}>
                  {!!sweepstake.status ? 'Fechado' : 'Em aberto'}
                </SweepstakeStatus>

                <div>
                  <Link to={`/secret-santa/${sweepstake.id}`}>
                    <FiEdit size={24} />
                  </Link>

                  <button type="button" onClick={() => handleDeleteSweepstake(sweepstake.id)}>
                    <FiTrash size={24} />
                  </button>
                </div>
              </SweepstakesListItem>
            ))}
          </SweepstakesList>

        </SweepstakesContainer>
      </Container>
    </>
  );
}

export default Home;