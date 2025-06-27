import { randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
/**
 * Um problema que temos quando estamos lidando com interfaces é que
 * interfaces não vão conter métodos que são estáticos, ou seja, métodos
 * que existem na classe, mas não existem nas instâncias da classe.
 *
 * Uma interface no TypeScript é dividida em dois momentos:
 *
 * - Instanciamento: quando você cria uma instância de uma classe que implementa a interface. Esse é o padrão
 * - Definição: quando você define a interface com base na classe, ou seja, a estrutura da interface é a estrutura da classe.
 *
 * Vamos entender a diferença entre esses dois momentos e como podemos lidar com métodos estáticos
 * usando o contexto de uma classe de banco de dados que serializa e desserializa objetos.
 * E precisa ser generalizada para qualquer classe que implemente uma interface de serialização.
 */

{
  /**
   * MÉTODOS ESTÁTICOS
   *
   * São métodos que existem em qualquer instância da classe. São definidos a nível de construtor
   * é como se estivéssemos definindo algo que existe globalmente em qualquer instância da classe.
   *
   * Veja esse exemplo onde implementamos um Singleton, ou seja, uma classe que só pode ter uma instância.
   * Além de um método estático que cria uma instância da classe, temos um método estático que converte um objeto
   * para uma instância da classe.
   */
  class Pessoa {
    static instance: Pessoa | null = null;

    // constructor privado para evitar a criação de instâncias diretamente
    private constructor(public name: string) {}

    // método estático para criar uma instância da classe, e somente uma
    static create(name: string) {
      if (!Pessoa.instance) {
        Pessoa.instance = new Pessoa(name);
      }

      return Pessoa.instance;
    }

    toObject() {
      return {
        name: this.name,
      };
    }
  }

  // Podemos criar uma nova instância da classe Pessoa usando:
  const joao = Pessoa.create("João");

  // Mas não podemos instanciar diretamente a classe Pessoa, pois o construtor é privado
  const ana = new Pessoa("Ana");

  // No entanto, podemos acessar os métodos da instancia
  joao.toObject(); // { name: 'João' }
}

{
  /**
   * O grande problema é quando temos que tipar classes que possuem métodos estáticos.
   * Por exemplo, como fizemos na FTS essencial, onde temos uma classe que representa um
   * banco de dados, e essa classe possui métodos estáticos que são utilizados para
   * serializar e desserializar objetos.
   *
   * Toda instancia de uma entidade que é armazenada no banco de dados
   * precisa implementar essa interface para que nosso banco possa serializar e desserializar
   * os dados
   */
  interface Serializable {
    fromObject(obj: Record<string, unknown>): Pessoa;
    toObject(): Record<string, unknown>;
  }

  // mesmo já existindo, o TS ainda reclama que a classe Pessoa não implementa a interface Serializable
  class Pessoa implements Serializable {
    private constructor(public name: string) {}

    static fromObject(obj: Record<string, unknown>): Pessoa {
      const instance = new Pessoa(obj.name as string);
      return instance;
    }

    toObject() {
      return {
        name: this.name,
      };
    }
  }

  /**
   * Isso acontece porque interfaces do TypeScript atuam no lado dinâmico da classe
   * e não do lado estático. Então é como se todas as interfaces atuassem diretamente nas instancias da classe
   * mas não na classe em si
   */
}

{
  /**
   * Para resolver esse problema temos que usar algo chamado
   * Constructor Signature, que é uma forma de definir uma interface
   * que tem a definição de um construtor, ou seja, uma interface que
   * não está definindo uma instância, mas sim a classe em si.
   */
  interface Serializable {
    new (...args: any[]): any;
    fromObject(obj: Record<string, unknown>): Pessoa;
    toObject(): Record<string, unknown>;
  }

  // Mas isso ainda não vai funcionar porque você está definindo
  // métodos estáticos e dinâmicos na mesma interface
  class Pessoa implements Serializable {
    private constructor(public name: string) {}

    static fromObject(obj: Record<string, unknown>): Pessoa {
      const instance = new Pessoa(obj.name as string);
      return instance;
    }

    toObject() {
      return {
        name: this.name,
      };
    }
  }
}

{
  /**
   * A solução para isso não é bonita, mas é a única forma de fazer isso funcionar
   * temos que definir uma interface que representa o construtor da classe
   * e outra que representa a instância da classe.
   */
  interface Serializable {
    id: string;
    toObject(): Record<string, unknown>;
  }

  interface SerializableStatic {
    new (...args: any[]): any;
    fromObject(obj: {
      id: string;
      name: string;
      [k: string]: unknown;
    }): InstanceType<this>;
  }

  //Agora dizemos que a classe Pessoa implementa Serializable
  //somente a parte dinâmica
  class Pessoa implements Serializable {
    id: string = randomUUID();
    name: string = "";

    static fromObject(obj: {
      id: string;
      name: string;
      [k: string]: unknown;
    }): Pessoa {
      const instance = new Pessoa();
      instance.id = obj.id as string;
      instance.name = obj.name as string;
      return instance;
    }

    toObject() {
      return {
        name: this.name,
      };
    }
  }

  /**
   * Então, no nosso banco de dados, podemos usar a interface SerializableStatic
   * para receber a parte estática da classe, e a interface Serializable
   * atráves de type parameters
   */
  class Database<
    S extends SerializableStatic,
    I extends Serializable = InstanceType<S>,
  > {
    #dbPath: string;
    #data: Map<string, I> = new Map();
    #entity: S;

    // Recebemos a parte estática da classe como parâmetro
    constructor(entity: S) {
      this.#dbPath = resolve(
        dirname(import.meta.url),
        `.data/${entity.name.toLowerCase()}.json`,
      );
      this.#entity = entity;
      this.#initialize();
    }

    // inicializamos o banco de dados
    #initialize() {
      if (existsSync(this.#dbPath)) {
        const data: Array<
          [string, Parameters<SerializableStatic["fromObject"]>[0]]
        > = JSON.parse(readFileSync(this.#dbPath, "utf-8"));
        for (const [key, value] of data) {
          // veja o uso do método estático fromObject
          this.#data.set(key, this.#entity.fromObject(value));
        }
        return;
      }
      // salva o arquivo
    }

    //Agora podemos incluir métodos genericos para manipular os dados
    get(id: string): I | undefined {
      return this.#data.get(id);
    }

    getAll(): I[] {
      return [...this.#data.values()];
    }

    save(entity: I): this {
      this.#data.set(entity.id, entity);
      return this;
    }
  }

  // Agora podemos usar assim
  const db = new Database(Pessoa);
  const todas = db.getAll(); // Pessoa[]
  const uma = db.get("123"); // Pessoa | undefined
  db.save(new Pessoa()); // somente recebe uma instância de Pessoa
}
