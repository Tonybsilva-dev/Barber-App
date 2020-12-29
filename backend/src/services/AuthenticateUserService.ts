import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import User from '../models/User'

interface Request {
  email: string,
  password: string,
}

interface Response{
  user: User,
  token: string,
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw new Error('Incorrect email/password combination.')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.')
    }

    /* Criando um Token com assinatura
    1 - Primeiro parâmetro - Informações que podem ser usadas do usuário (Não coloque credenciais)
    esse parametro chama-se Payload e pode ser descriptografado (Cuidado)
    ex: Permissions, name, id
    2 - Segundo parâmetro - Um segredo que só nossa aplicação conhece.
    O segredo usado foi gerado pelo www.md5.cz, após escolher minha paralavra secreta.
    3 - Terceiro parâmetro - configurações do Token
    */

    const token = sign({}, '9787922f286a4349a009237d0b2ffd73', {
      //Para saber a qual usuário pertence o token gerado
      subject: user.id,
      //Quanto tempo o usuário vai ficar logado
      expiresIn: '1d',
    });

    return {
      user,
      token
    }

  }
}

export default AuthenticateUserService;