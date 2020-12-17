import { Router } from 'express'

import appointmentsRouter from './appointments.routes';
// import userRouter from './users.routes';



const routes = Router();

routes.get('/appointments', appointmentsRouter )
// routes.get('/users', appointmentsRouter )


export default routes;
