import express from 'express';
import routes from './routes';
import './database'

const app = express();
app.use(routes);
app.use(express.json())



app.listen(3334, () => {
  console.log('🚀 Server started on port 3333!');
})
