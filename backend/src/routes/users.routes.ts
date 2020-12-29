import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
const usersRouter = Router();

//Rota responsável por criar um usuário
usersRouter.post('/', async (request, response) => {
    
    console.log(request.body)
    try {    
        const { name, email, password } = request.body;
        
        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user)
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;