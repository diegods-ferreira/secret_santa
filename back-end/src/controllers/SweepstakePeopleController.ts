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

  async create(request: Request, response: Response) {
    const { name, email, sweepstake_id } = request.body;

    try {
      const sweepstakeExist = await knex('sweepstakes')
        .where('id', sweepstake_id)
        .first();

      if (!sweepstakeExist) {
        return response.status(400).json({ message: 'Sweepstake not found.' });
      }

      if (sweepstakeExist.status === 1) {
        return response.status(400).json({ message: 'Sweepstake is already closed.' });
      }

      const emailExist = await knex('sweepstakes_people')
        .where({ email, sweepstake_id })
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
      const peopleExist = await knex('sweepstakes_people')
        .where('id', id)
        .first();

      if (!peopleExist) {
        return response.status(400).json({ message: 'This person doesn\'t exist.' });
      }

      const emailExist = await knex('sweepstakes_people')
        .where('email', email)
        .andWhere('sweepstake_id', peopleExist.sweepstake_id)
        .andWhereNot('id', peopleExist.id)
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
      const peopleExist = await knex('sweepstakes_people')
        .where('id', id)
        .first();

      if (!peopleExist) {
        return response.status(400).json({ message: 'This person doesn\'t exist.' });
      }

      await knex('sweepstakes_people').where('id', id).delete();
      return response.status(200).send();
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default SweepstakePeopleController;