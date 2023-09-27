// se tentarmos importar Usuario direto do barrel vamos ter um problema, pois ele não exporta o default
// import Usuario, { Database } from './db/index' // veja que estamos usando o arquivo index.ts e ele vai ter tudo que foi exportado no barrel
// Precisamos importar direto do arquivo, default exports não são boa prática
import Usuario from './db/Usuario'
import { Database } from './db/Db'

function main() {
  // inicialização do DB
  const db = new Database()

  // criação de usuários
  const usuarios = db.listar()
  console.log(usuarios) // []

  if (!usuarios.length) {
    const Jose = Usuario.create('José', 'jose@email.com', 'A formação TS é show')
    db.upsert(Jose)
  }

  console.log(db.listar())

  // busca de usuário
  const usuario = db.buscar(usuarios[0].id)
  if (!usuario) throw new Error('Usuário não encontrado')

  console.log(usuario.toString())
  const novoUsuario = usuario.mudarSenha(Date.now().toString())
  db.upsert(novoUsuario)
  console.log(db.listar())
}

main()
