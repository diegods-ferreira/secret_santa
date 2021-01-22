import { Request, Response } from 'express';
import { SentMessageInfo, TestAccount } from 'nodemailer';

import knex from '../database/connection';

interface People {
  id: number;
  name: string;
  email: string;
  sweepstake_id: number;
  created_at: string;
  updated_at: string;
}

interface SweepstakedPeople {
  people: People;
  drawn_people: People;
}

class DrawController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { sweepstake_id } = request.params;

    try {
      const sweepstakeExist = await knex('sweepstakes')
        .where('id', sweepstake_id)
        .first();
      
      if (!sweepstakeExist) {
        return response.status(400).json({ message: 'Sweepstake not found.' });
      }

      if (sweepstakeExist.status === 1) {
        return response.status(400).json({ message: 'This sweepstake has been drawn already.' });
      }

      const allPeople = await knex('sweepstakes_people')
        .where('sweepstake_id', sweepstake_id)
        .select('*');

      if (!allPeople) {
        return response.status(400).json({ message: 'No people to draw.' });
      }

      if (allPeople.length < 3) {
        return response.status(400).json({ message: 'You need 3 people to draw at least.' });
      }

      const drawnPeople = drawPeople(allPeople);

      let sweepstakedPeople: SweepstakedPeople[] = [];

      drawnPeople.map((people, index) => {
        if (drawnPeople.indexOf(people) === drawnPeople.length - 1) {
          sweepstakedPeople.push({
            people,
            drawn_people: drawnPeople[0],
          });
        } else {
          sweepstakedPeople.push({
            people,
            drawn_people: drawnPeople[index + 1],
          });
        }
      });

      const nodemailer = require("nodemailer");

      nodemailer.createTestAccount((err: Error, account: TestAccount) => {
        if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        });

        sweepstakedPeople.map(sweepstakedPerson => {
          let message = {
            from: 'Secret Santa (secret@santa.claus)',
            to: sweepstakedPerson.people.email,
            subject: 'Who is your Secret Santa?!',
            text: `Hello, ${sweepstakedPerson.people.name}, we've made the draw and your Secret Santa is ${sweepstakedPerson.drawn_people.name} / ${sweepstakedPerson.drawn_people.email}`,
          }

          transporter.sendMail(message, (err: Error, info: SentMessageInfo) => {
            if (err) {
              console.log('Error occurred. ' + err.message);
              return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            console.log('---------------------------------------------------');
          });
        });
      });

      await knex('sweepstakes').update('status', 1);
  
      return response.json(sweepstakedPeople);
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

function drawPeople(allPeople: People[]): People[] {
  /**
   * Randomize array in-place using Durstenfeld shuffle algorithm
   * Fonte: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   */
  
  for (let i = allPeople.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = allPeople[i];
    allPeople[i] = allPeople[j];
    allPeople[j] = temp;
  }

  return allPeople;
}

export default DrawController;