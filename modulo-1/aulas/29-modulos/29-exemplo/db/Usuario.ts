import { createHash, randomUUID } from 'crypto'

interface UsuarioBase {
  nome: string
  email: string
  senha: string
}

export interface UsuarioCreate extends UsuarioBase {
  id?: string
}

export interface IUsuario extends UsuarioBase {
  readonly id: string
}

export default class Usuario implements IUsuario {
  constructor(readonly id: string, public nome: string, public email: string, readonly senha: string) {}

  static create(nome: string, email: string, senha: string) {
    const senhaHash = createHash('sha512').update(senha).digest('hex')
    return new Usuario(randomUUID(), nome, email, senhaHash)
  }

  static fromObject(obj: IUsuario) {
    return new Usuario(obj.id, obj.nome, obj.email, obj.senha)
  }

  toString() {
    return `Usuário ${this.nome} <${this.email}>`
  }

  equals(usuario: Usuario) {
    return this.id === usuario.id
  }

  sayHello() {
    console.log(`Olá, eu sou ${this.nome} e meu email é ${this.email}`)
  }

  mudarSenha(novaSenha: string) {
    const senhaHash = createHash('sha512').update(novaSenha).digest('hex')
    return new Usuario(this.id, this.nome, this.email, senhaHash)
  }
}
