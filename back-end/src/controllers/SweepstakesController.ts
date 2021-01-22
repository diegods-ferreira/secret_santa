import { Request, Response } from 'express';
import knex from '../database/connection';

class SweepstakesController {
  async index(request: Request, response: Response) {
    try {
      const sweepstakes = await knex('sweepstakes').select('*');

      if (sweepstakes.length === 0) {
        return response.json([]);
      }

      const serializedSweepstake = await Promise.all(sweepstakes.map(async sweepstake => {
        const people = await knex('sweepstakes_people')
            .where('sweepstake_id', sweepstake.id)
            .select('*');

        return { ...sweepstake, people };
      }));

      return response.json(serializedSweepstake);
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const sweepstake = await knex('sweepstakes').where('id', id).first();

      if (!sweepstake) {
        return response.status(400).json({ message: 'Sweepstake not found.' });
      }

      const sweepstake_people = await knex('sweepstakes_people')
        .where('sweepstake_id', id)
        .select('*');

      const serializedSweepstake = Object.assign(sweepstake, {
        people: sweepstake_people
      });
      
      return response.json(serializedSweepstake);
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    try {
      const insertedSweepstake = await knex('sweepstakes').insert({
        title,
        description,
      }, ['*']);
  
      return response.json(insertedSweepstake[0]);
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' })
    }    
  }

  async update(request: Request, response: Response) {
    const { title, description } = request.body;
    const { id } = request.params;

    try {
      const sweepstakeExist = await knex('sweepstakes')
        .where('id', id)
        .first();

      if (!sweepstakeExist) {
        return response.status(400).json({ message: 'Sweepstake not found.' });
      }

      const updatedSweepstake = await knex('sweepstakes')
        .where('id', id)
        .update({
          title,
          description,
        }, ['*']);

      return response.json(updatedSweepstake[0]);
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const sweepstakeExist = await knex('sweepstakes')
        .where('id', id)
        .first();

      if (!sweepstakeExist) {
        return response.status(400).json({ message: 'Sweepstake not found.' });
      }

      const sweepstakeHasPeople = await knex('sweepstakes_people')
        .where('sweepstake_id', id)
        .select('*');
      
      if (sweepstakeHasPeople.length > 0) {
        return response.status(400).json({ message: 'This sweepstake has people.' });
      }

      await knex('sweepstakes').where('id', id).delete();
      return response.status(200).send();
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default SweepstakesController;