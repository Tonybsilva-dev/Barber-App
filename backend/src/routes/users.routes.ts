import { Router } from 'express';
import multer from 'multer';
import UploadConfig from '../config/upload';

import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository';

import CreateUserService from '../services/CreateUserService';
import UpdatedUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(UploadConfig);


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

//Rota para obter usuários
usersRouter.get('/', ensureAuthenticated, async (request, response) => {
    //Pegamos um repositório para funções personalizadas
    const usersRepository = getCustomRepository(UsersRepository)
    //Buscamos todos os agendamentos
    const users = await usersRepository.find();
    //Retornamos todos os agendamentos
    return response.json(users)
});

//Para atualizar uma única informação do usuário se utiliza o método patch
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request: any, response) => {

    console.log(request.file) // -> Obter dados do arquivo enviado.
    try {
        //Inicializando o serviço para atualizar o avatar
        const updateUserAvatar = new UpdatedUserAvatarService();

        //Necessário para atualizar o avatar
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
        })
        //retornamos o usuário atualizado com base no service definido
        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

export default usersRouter;