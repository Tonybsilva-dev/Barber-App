import 'reflect-metadata';

import express, {Request, Response, NextFunction} from 'express';
import routes from './routes';

import './database';

const app = express();
app.use(express.json());


// ========== FUNCTIONS ==========

/* Middleware para log de requisições.
Bom para saber qual rota o usuário está, e que tipo de requisição ela faz.
Aqui ela traz o método e a url acessada. */

function logRequests(request: Request, response: Response, next: NextFunction){
  const { method, url } = request;
  console.log('==========')
  const logLabel = `[${method.toUpperCase()}] ${url}`
  console.log(logLabel);
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
  console.log('==========')
}

// ========== END FUNCTIONS ==========

app.use(logRequests)
app.use(routes);

const port = 3334

app.listen({ port }, () => {
  console.log(`🚀 Server started on port ${port}!`)
})
