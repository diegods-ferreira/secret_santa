import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiEdit, FiPlus, FiShuffle, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import {
  LoadingScreen,
  Header,
  Container,
  FormContainer,
  SweepstakePeopleContainer,
  PeopleList,
  PeopleListItem,
} from './styles';

interface RouteParams {
  id: string | undefined;
}

interface People {
  id: number;
  name: string;
  email: string;
}

interface Sweepstake {
  id: number;
  title: string;
  description: string;
  status: number;
  people: People[];
}

interface DrawnPeople {
  people: People;
  drawn_people: People;
}

const SecretSanta: React.FC = () => {
  const { id: sweepstake_id } = useParams<RouteParams>();

  const [sweepstake, setSweepstake] = useState<Sweepstake>({} as Sweepstake);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [drawnPeople, setDrawnPeople] = useState<DrawnPeople[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/sweepstakes/${sweepstake_id}`);
      setSweepstake(response.data);
    }

    loadData();
  }, [sweepstake_id]);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(state => ({ ...state, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    if (formData.name.trim() === '' || formData.email.trim() === '') {
      alert('Name and e-mail fields can\'t be empty.');
      return;
    }

    try {
      const response = await api.post('/sweepstakes-people', {
        ...formData,
        sweepstake_id: sweepstake_id,
      });

      setSweepstake(state => ({
        ...state,
        people: [...state.people, response.data]
      }));
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      const formElement = event.target as HTMLFormElement;
      formElement.reset();
    }
  }, [formData, sweepstake_id]);

  const handleDeletePeople = useCallback(async (id: number) => {
    try {
      await api.delete(`/sweepstakes-people/${id}`);
      setSweepstake(state => ({
        ...state,
        people: state.people.filter(people => people.id !== id)
      }));
    } catch (err) {
      alert(err.response.data.message);
    }
  }, []);

  const handleEditProple = useCallback(async (id: number) => {
    const people = sweepstake.people.find(findPeople => findPeople.id === id);

    const name = prompt('Digite o novo nome', people?.name);

    if (!name || name === '') {
      return;
    }

    const email = prompt('Digite o novo nome', people?.email);

    if (!email || email === '') {
      return;
    }

    try {
      const response = await api.put(`/sweepstakes-people/${id}`, {
        name,
        email,
      });

      setSweepstake(state => ({
        ...state,
        people: state.people.map(mapPeople => {
          if (mapPeople.id === id) {
            return response.data;
          }

          return mapPeople;
        }),
      }));
    } catch (err) {
      alert(err.response.data.message);
    }
  }, [sweepstake]);

  const handleDrawPeople = useCallback(async () => {
    try {
      const response = await api.post(`/draw-people/${sweepstake_id}`);

      setDrawnPeople(response.data);

      setSweepstake(state => ({ ...state, status: 1 }));
    } catch (err) {
      alert(err.response.data.message);
    }
  }, [sweepstake_id]);

  if (!sweepstake) {
    return <LoadingScreen>Carregando</LoadingScreen>;
  }

  return (
    <>
      <Header>
        <h1>{sweepstake?.title}</h1>
        <span>{sweepstake?.description}</span>
        <Link to="/">
          <FiArrowLeft />
          Voltar
        </Link>
      </Header>

      {sweepstake.status === 0 && (
        <Container>
          <FormContainer onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Digite o nome aqui" name="name" onChange={handleInputChange} />
            <input type="email" placeholder="Digite o e-mail aqui" name="email" onChange={handleInputChange} />

            <button type="submit">
              <FiPlus size={24} />
              Adicionar pessoa
            </button>
          </FormContainer>

          <SweepstakePeopleContainer>
            <div>
              <h2>Pessoas participando ({sweepstake.people.length})</h2>

              <button type="button" onClick={handleDrawPeople}>
                <FiShuffle />
                Sortear
              </button>
            </div>

            <PeopleList>
              {sweepstake.people && sweepstake.people.map(people => (
                <PeopleListItem key={`${people.id}-${new Date().getTime()}`}>
                  <div>
                    <strong>{people.name}</strong>
                    <span>{people.email}</span>
                  </div>

                  {/* <SweepstakeStatus status={people.status}>
                    {!!people.status ? 'Fechado' : 'Em aberto'}
                  </SweepstakeStatus> */}

                  <div>
                    <button type="button" onClick={() => handleEditProple(people.id)}>
                      <FiEdit size={24} />
                    </button>

                    <button type="button" onClick={() => handleDeletePeople(people.id)}>
                      <FiTrash size={24} />
                    </button>
                  </div>
                </PeopleListItem>
              ))}
            </PeopleList>
          </SweepstakePeopleContainer>
        </Container>
      )}

      {drawnPeople.length > 0 && (
        <Container>
          <SweepstakePeopleContainer>
            <div>
              <h2>Sorteio realizado!</h2>
            </div>

            <PeopleList>
              {drawnPeople.map(drawnPeopleMap => (
                <PeopleListItem>
                  <strong>{drawnPeopleMap.people.name}</strong>
                  <FiArrowRight size={24} />
                  <span>{drawnPeopleMap.drawn_people.name}</span>
                </PeopleListItem>
              ))}
            </PeopleList>
          </SweepstakePeopleContainer>
        </Container>
      )}

      {sweepstake.status === 1 && (
        <Container>
          <SweepstakePeopleContainer>
            <div>
              <h2>Amigo secreto fechado e e-mails enviados!</h2>
            </div>
          </SweepstakePeopleContainer>
        </Container>
      )}
    </>
  );
}

export default SecretSanta;