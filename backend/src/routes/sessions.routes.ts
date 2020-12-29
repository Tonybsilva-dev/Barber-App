import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
const sessionsRouter = Router();

//Rota responsável por criar um usuário
sessionsRouter.post('/', async (request, response) => {

  console.log(request.body)
  try {
    //Requisita os dados necessários para logar
    const { email, password } = request.body
    //inicia o seviço de autenticação
    const autheticateUser = new AuthenticateUserService();

    //Passamos o dados do usuário pelo serviço para verificar credenciais
    const { user } = await autheticateUser.execute({
      email,
      password,
    })
    //Retiramos o password do response
    delete user.password;
    //Retorna o usuário logado
    return response.json({ user })

  } catch (err) {
    //Retorna o erro disponibilizado pelo serviço
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;