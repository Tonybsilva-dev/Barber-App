import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
const sessionsRouter = Router();

//Rota responsável por criar um usuário
sessionsRouter.post('/', async (request, response) => {

  console.log(request.body)
  try {

    const { email, password } = request.body

    const autheticateUser = new AuthenticateUserService();

    const { user } = await autheticateUser.execute({
      email,
      password,
    })

    delete user.password;

    return response.json({ user })
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;