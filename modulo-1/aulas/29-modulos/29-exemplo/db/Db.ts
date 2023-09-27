import { existsSync, writeFileSync, openSync, readFileSync } from 'node:fs' // importa somente as funções nas chaves

// só é permitido se allowSyntheticDefaultImports estiver habilitado
// import path from 'node:path'

// se não estiver habilitado, deve ser assim:
import * as path from 'node:path' // importa todas as coisas do módulo path

// Import padrão da classe Usuario
// mas estamos importando o IUsuario somente como tipo, então não precisamos dele no código final
import Usuario, { type IUsuario } from './Usuario'

export class Database {
  readonly caminho: string
  #db: Map<Usuario['id'], Usuario> = new Map()

  constructor(caminho = './db.json') {
    this.caminho = path.resolve(__dirname, caminho)
    this.#inicializar()
  }

  #inicializar() {
    if (existsSync(this.caminho)) {
      const conteudo = readFileSync(this.caminho, { encoding: 'utf-8' })
      const objeto: [string, Usuario][] = (JSON.parse(conteudo) as Array<[string, IUsuario]>).map(([id, usuario]) => [
        id,
        Usuario.fromObject(usuario)
      ])
      this.#db = new Map(Array.from(objeto))
      return
    }
    this.#atualizarArquivo()
  }

  #atualizarArquivo() {
    writeFileSync(this.caminho, JSON.stringify([...this.#db]))
  }

  upsert(entidade: Usuario) {
    this.#db.set(entidade.id, entidade)
    this.#atualizarArquivo()
  }

  // Uma forma é pegar o ID pela interface
  buscar(id: IUsuario['id']) {
    return this.#db.get(id)
  }

  listar() {
    return Array.from(this.#db.values())
  }

  // Podemos usar o Usuario['id'] para pegar o tipo do id da classe Usuario também
  remover(id: Usuario['id']) {
    this.#db.delete(id)
    this.#atualizarArquivo()
  }
}
