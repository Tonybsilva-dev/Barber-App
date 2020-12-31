import path from 'path'
import multer from 'multer'
import crypto from 'crypto';


export default {
  storage: multer.diskStorage({
    //Rota onde ficará o upload das imagens
    //A pasta uploads não será enviada pro git, mas a temporária sim. (.gitignore)
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename(request, file, callback) {
      //Manter o nome dos arquivos únicos
      //Criar um hash de 10 bytes aleatórios convertidos em string hexadecimal
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}