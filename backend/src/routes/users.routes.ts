import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
const usersRouter = Router();

//Rota responsável por criar um usuário
usersRouter.post('/', async (request, response) => {

    try {
        //Dados necessários para criar um usuário    
        const { name, email, password } = request.body;
        //Iniciamos o serviço de Criar Usuário
        const createUser = new CreateUserService();
        //Passamos os dados pelo serviço para validação
        const user = await createUser.execute({
            name,
            email,
            password,
        });
        //Retiramos o password do response
        delete user.password;
        //Retornamos o usuário
        return response.json(user)
    } catch (err) {
        //Retornamos o erro disponibilizado pelo serviço
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;