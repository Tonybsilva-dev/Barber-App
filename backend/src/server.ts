import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

const app = express();
app.use(express.json());

// Middleware para log de requisições do frontend.
// Bom para saber qual rota o usuário está, e que tipo de requisição ela faz.
// Aqui ela traz o método e a url acessada.
function logRequests(req: any, res: any, next: any){
  const { method, url } = req;
  const logLabel = `[${method.toUpperCase()}] ${url}`
  console.log(logLabel);
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}
app.use(logRequests)

app.use(routes);

const port = 3334

app.listen({ port }, () => {
  console.log(`🚀 Server started on port ${port}!`)
})
