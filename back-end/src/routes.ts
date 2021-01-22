import express from 'express';
import { celebrate, Joi } from 'celebrate';

import SweepstakesController from './controllers/SweepstakesController';
import SweepstakePeopleController from './controllers/SweepstakePeopleController';
import DrawController from './controllers/DrawController';

const routes = express.Router();

const sweepstakesController = new SweepstakesController();
const sweepstakePeopleController = new SweepstakePeopleController();
const drawController = new DrawController();

routes.get('/sweepstakes', sweepstakesController.index);
routes.get('/sweepstakes/:id', sweepstakesController.show);
routes.post('/sweepstakes/', sweepstakesController.create);
routes.put('/sweepstakes/:id', sweepstakesController.update);
routes.delete('/sweepstakes/:id', sweepstakesController.delete);

routes.get('/sweepstakes-people', sweepstakePeopleController.index);
routes.get('/sweepstakes-people/:id', sweepstakePeopleController.show);
routes.post('/sweepstakes-people/', sweepstakePeopleController.create);
routes.put('/sweepstakes-people/:id', sweepstakePeopleController.update);
routes.delete('/sweepstakes-people/:id', sweepstakePeopleController.delete);

routes.post('/draw-people/:sweepstake_id', drawController.index);

export default routes;