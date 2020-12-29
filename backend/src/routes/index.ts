import express,{ Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes'

const app = express()
const routes = Router();


// // Middleware para log de requisições do frontend.
// // Bom para saber qual rota o usuário está, e que tipo de requisição ela faz.
// // Aqui ela traz o método e a url acessada.
// function logRequests(req: any, res: any, next: any){
//   const { method, url } = req;
//   const logLabel = `[${method.toUpperCase()}] ${url}`
//   console.log(logLabel);
//   console.time(logLabel);
//   next();
//   console.timeEnd(logLabel);
// }
// app.use(logRequests)



routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter)

export default routes;