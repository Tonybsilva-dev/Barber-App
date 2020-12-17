import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

const app = express();
const port = 3333 || 3334
app.use(routes);
app.use(express.json());



app.listen({ port }, () => {
  console.log(`🚀 Server started on port ${port}!`)
})
