{
  /**
   * Decorators permitem que façamos o que é chamado de meta programação
   * ou seja, eles modificam o comportamento de uma classe e seus membros
   * em tempo de execução.
   *
   * Mas para isso precisamos primeiro configurar o nosso tsconfig para
   * aceitar decorators. Fazemos isso ativando a flag `experimentalDecorators`
   * e `emitDecoratorMetadata` no tsconfig.json
   * Além disso precisamos que o target seja pelo menos ES5
   */

  /**
   * Existem duas versões de decorators no TypeScript, a versão legada
   * que vamos ver nessa aula, e a versão mais recente
   * que é parte de uma proposta do TC39 para o JavaScript
   * O TypeScript implementou essa proposta na versão 5.0
   *
   * A versão legada é chamada de Decorators Stage 2
   * E a versão mais recente é chamada de decorator
   * Stage 3 e só está disponível a partir do TS 5
   */

  /**
   * Um decorator é uma função que pode ser aplicada
   * antes da instanciação/execução de alguma classe, método ou parâmetro
   * eles são bem comuns em outras linguagens como Java e já estão
   * fazendo sua aparição em frameworks como Nest
   */

  // Esse é um exemplo de decorator simples sem tipagem
  function debug(metodo: any, contexto: any): void {
    console.log({ metodo, contexto });
  }

  // @ts-expect-error Vamos ter um erro de compilação local
  @debug // Isto é um decorator
  class MinhaClasse {}

  /**
   * IMPORTANTE! Para podermos executar decorators nós TEMOS
   * que compilar o TS com o TSC, eles não funcionam com o TSX
   * e nem com o node
   */

  /**
   * Existem 5 lugares onde podemos utilizar decorators:
   * - classes
   * - propriedades de classes
   * - métodos
   * - getters e setters
   * - parâmetros de funções
   * A diferença entre cada um são os tipos de parâmetros que eles vão receber
   */
}

{
  /***********************/
  /***Class Decorators***/
  /*********************/
  /**
   * Class decorators recebem o construtor da classe.
   * Eles podem apenas executar código ou retornar
   * um novo construtor que substitui o original.
   *
   * Exemplo: vamos criar um decorator @Singleton
   * que garante que só exista uma instância da classe.
   */
  function Singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
    let instance: any;
    return class extends constructor {
      constructor(...args: any[]) {
        if (!instance) {
          console.log("[Singleton] Criando primeira instância");
          super(...args);
          instance = this;
        } else {
          console.log("[Singleton] Retornando instância existente");
          return instance;
        }
      }
    };
  }

  @Singleton
  class Config {
    constructor(public url: string) {}
  }

  const c1 = new Config("http://localhost");
  const c2 = new Config("http://prod");
  console.log("Singletons", c1 === c2); // true
}

{
  /**************************/
  /***Property Decorators***/
  /************************/
  /**
   * Property decorators recebem o prototype da classe
   * e o nome da propriedade.
   *
   * Por limitações de inicialização no typeScript não podemos fazer
   * muitas coisas com decorators de propriedades a não ser validar que
   * uma propriedade de um determinado nome foi criada na classe
   */
  function LogProperty(target: any, key: string) {
    console.log(`[LogProperty] Propriedade ${key} foi criada`);
  }

  class User {
    @LogProperty
    city: string;

    constructor(city: string) {
      this.city = city;
    }
  }

  const u = new User("Berlin");
  console.log(u.city);

  u.city = "paris";
  console.log(u.city);
}

{
  /************************/
  /***Method Decorators***/
  /**********************/
  /**
   * Method decorators recebem o prototype, o nome do método
   * e o PropertyDescriptor, permitindo alterar o método.
   *
   * Exemplo: @MeasureTime que mede o tempo de execução de um método.
   */
  function MeasureTime(
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const start = performance.now();
      const result = original.apply(this, args);
      const end = performance.now();
      console.log(
        `[MeasureTime] ${propertyKey} levou ${(end - start).toFixed(2)}ms`,
      );
      return result;
    };
  }

  class MathOps {
    @MeasureTime
    slowOperation(n: number) {
      let sum = 0;
      for (let i = 0; i < n; i++) sum += i;
      return sum;
    }
  }

  new MathOps().slowOperation(1_000_000);
}

{
  /**************************/
  /***Accessor Decorators***/
  /************************/
  /**
   * Accessor decorators também recebem um PropertyDescriptor
   * e permitem modificar getters e setters.
   *
   * Exemplo: @ReadOnly que impede a redefinição de um getter.
   */
  function ReadOnly(
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    descriptor.set = function () {
      throw new Error(`[ReadOnly] Não é possível sobrescrever ${propertyKey}`);
    };
  }

  class Produto {
    private _preco = 100;

    @ReadOnly
    get preco() {
      return this._preco;
    }

    set preco(valor: number) {
      this._preco = valor;
    }
  }

  const prod = new Produto();
  console.log(prod.preco);
  try {
    prod.preco = 200; // <-- erro
  } catch (error) {
    console.error(error);
  }
}

{
  /***************************/
  /***Parameter Decorators***/
  /*************************/
  /**
   * Parameter decorators recebem:
   * - target: o prototype da classe
   * - propertyKey: o nome do método
   * - parameterIndex: o índice do parâmetro no método
   *
   * Vamos criar um decorator @LogParam que apenas
   * mostra no console quais parâmetros foram decorados.
   */
  function LogParam(target: any, propertyKey: string, parameterIndex: number) {
    console.log(
      `[LogParam] Parâmetro #${parameterIndex} decorado no método ${propertyKey}`,
    );
  }

  class Service {
    send(@LogParam msg: string, @LogParam priority: number) {
      console.log(`Enviando "${msg}" com prioridade ${priority}`);
    }
  }

  const s = new Service();
  s.send("Olá!", 1);
}

{
  /**
   * Relembrando
   * Decorators são simplesmente funções que retornam
   * ou uma função ou nada. Cada tipo de decorator segue
   * uma estrutura específica, mas podemos definir um
   * decorator com todas as propriedades que pode ser aplicado
   * em todos os casos
   */
  function Debug(
    target: any,
    propertyKey?: string,
    descriptor?: PropertyDescriptor,
  ) {
    // Caso 1: Class decorator
    if (propertyKey === undefined && descriptor === undefined) {
      const originalConstructor = target;
      const newConstructor: any = function (...args: any[]) {
        console.log(
          `[DEBUG] Instanciando classe: ${originalConstructor.name} com args:`,
          args,
        );
        return new originalConstructor(...args);
      };
      newConstructor.prototype = originalConstructor.prototype;
      return newConstructor;
    }

    // Caso 2: Property decorator
    if (descriptor === undefined) {
      let value = target[propertyKey!];
      Object.defineProperty(target, propertyKey!, {
        get() {
          console.log(
            `[DEBUG] Obtendo propriedade: ${String(propertyKey)} =>`,
            value,
          );
          return value;
        },
        set(newVal) {
          console.log(
            `[DEBUG] Alterando propriedade: ${String(propertyKey)} =>`,
            newVal,
          );
          value = newVal;
        },
        enumerable: true,
        configurable: true,
      });
      return;
    }

    // Caso 3: Method ou Accessor decorator
    if (
      typeof descriptor.value === "function" ||
      typeof descriptor.get === "function" ||
      typeof descriptor.set === "function"
    ) {
      // Decorando métodos
      if (descriptor.value) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
          console.log(
            `[DEBUG] Chamando método: ${String(propertyKey)} com args:`,
            args,
          );
          const result = original.apply(this, args);
          console.log(`[DEBUG] Retorno de ${String(propertyKey)} =>`, result);
          return result;
        };
      }

      // Decorando getters/setters
      if (descriptor.get) {
        const original = descriptor.get;
        descriptor.get = function () {
          console.log(`[DEBUG] Acessando getter: ${String(propertyKey)}`);
          return original.apply(this);
        };
      }

      if (descriptor.set) {
        const original = descriptor.set;
        descriptor.set = function (value) {
          console.log(
            `[DEBUG] Atualizando valor de ${String(propertyKey)} para ${value}`,
          );
          return original.apply(this, [value]);
        };
      }
    }

    return descriptor;
  }

  @Debug
  class Foo {
    @Debug private _nome: string;

    constructor(nome: string) {
      this._nome = nome;
    }

    @Debug
    dizerOi() {
      console.log(`${this._nome} diz oi`);
    }

    get nome() {
      return this._nome;
    }

    @Debug
    set nome(value) {
      this._nome = value;
    }
  }

  const f = new Foo("Lucas");
  console.log(f.nome);
  f.nome = "Carla";
  f.dizerOi();
}
