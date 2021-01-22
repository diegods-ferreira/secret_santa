import { Request, Response } from 'express';
import knex from '../database/connection';

class SweepstakePeopleController {
  async index(request: Request, response: Response) {
    try {
      const people = await knex('sweepstakes_people').select('*');

      return response.json(people);
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const people = await knex('sweepstakes_people').where('id', id).first();

      if (!people) {
        return response.status(400).json({ message: 'Person not found.' });
      }
      
      return response.json(people);
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async create(request: Request, response: Response) {
    const { name, email, sweepstake_id } = request.body;

    try {
      const sweepstakeExist = await knex('sweepstakes')
        .where('id', sweepstake_id)
        .first();

      if (!sweepstakeExist) {
        return response.status(400).json({ message: 'Sweepstake not found.' });
      }

      const emailExist = await knex('sweepstakes_people')
        .where('email', email)
        .first();

      if (emailExist) {
        return response.status(400).json({ message: 'This e-mail already exists.' });
      }

      const insertedPeople = await knex('sweepstakes_people').insert({
        name,
        email,
        sweepstake_id,
      }, ['*']);
  
      return response.json(insertedPeople[0]);
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' })
    }    
  }

  async update(request: Request, response: Response) {
    const { name, email } = request.body;
    const { id } = request.params;

    try {
      const emailExist = await knex('sweepstakes_people')
        .where('email', email)
        .first();

      if (emailExist) {
        return response.status(400).json({ message: 'This e-mail already exists.' });
      }

      const updatedPeople = await knex('sweepstakes_people')
        .where('id', id)
        .update({
          name,
          email,
        }, ['*']);

      return response.json(updatedPeople[0]);
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await knex('sweepstakes_people').where('id', id).delete();
      return response.status(200).send();
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default SweepstakePeopleController;