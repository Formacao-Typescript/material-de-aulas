/**
 * Além de suportar propostas de estágio 2, como vimos na aula anterior,
 * o TypeScript também suporta propostas de estágio 3, que são mais novas
 * e devem ser usadas como principais ao invés das anteriores
 *
 * A primeira mudança que precisamos fazer é no nosso tsconfig.json
 * setando a opção experimentalDecorators e emitDecoratorMetadata para false
 * e a opção useDefineForClassFields para true.
 *
 */

// Vamos definir um tipo que será o construtor de uma classe
type UmaClasse = new (...args: any[]) => any;
{
  /**
   * Diferente do estágio 2, decorators de estágio 3 podem retornar uma função
   * que vai subirstituir o método, propriedade ou classe decorada.
   * além de receber um objeto de contexto e tem melhor suporte para campos
   * privados, estáticos e instâncias.
   */

  function logClass(target: UmaClasse, context: ClassDecoratorContext) {
    console.log("Class Decorator:", target.name);
    console.dir({ context, target });
  }

  @logClass
  class User {}
}

{
  /**
   * Assim como os demais tipos de decorators, você pode decorar a mesma série
   * de funcionalidades com o decorator de stage 3
   * - Uma classe
   * - Métodos
   * - Getters
   * - Setters
   * - Accessors
   * - Campos
   */

  // O tipo de um decorator é definido como
  type QualquerDecorator =
    | ClassDecorator // Para classes
    | MethodDecorator // Métodos
    | ParameterDecorator // Parâmetros de funções
    | PropertyDecorator; // Propriedades, getters, setters
}

// DECORATORS DE CLASSE
{
  // Impede que novas propriedades sejam adicionadas à classe
  function sealed(
    value: UmaClasse,
    _contextQueNaoVamosUsar: ClassDecoratorContext,
  ) {
    // A função está substituindo o constructor da classe
    return function (...args: any[]) {
      const instancia = new value(...args);
      Object.freeze(instancia);
      Object.freeze(instancia.prototype);
      return instancia;
      // Para que o decorator funcione, ele precisa forçar o retorno a ser uma classe
      // Caso contrário vamos ter um erro de tipo dizendo que uma função não é associável
      // à classe typeof User, experimente remover esse type cast
    } as unknown as UmaClasse;
  }

  @sealed
  class User {
    name = "Lucas";
  }

  const usuario = new User();
  console.log(`Objeto está congelado? => `, Object.isFrozen(usuario));
  // Descomentar essa linha vai te dar um erro
  // usuario.name = "Pedro";
  // console.log(usuario.name);
}

// DECORATORS DE MÉTODOS
{
  // Faz o mesmo que o nosso decorator stage 2
  function debug(value: Function, context: ClassMethodDecoratorContext) {
    // Veja que a função que retornamos NÃO é uma arrow function
    // isto porque se retornássemos uma, o nosso `this` não seria associado
    // à nossa classe e sim ao decorator
    return function (...args: any[]) {
      console.log(`Chamando ${String(context.name)} com:`, args);
      // @ts-expect-error this terá o tipo any aqui porque não temos como tipar esse valor
      const result = value.apply(this, args);
      console.log(`Resultado:`, result);
      return result;
    };
  }

  class MathOps {
    @debug
    sum(a: number, b: number) {
      return a + b;
    }
  }

  new MathOps().sum(2, 3);
}

// DECORATORS DE CAMPOS
{
  function readonly(value: any, context: ClassFieldDecoratorContext) {
    /**
     * A principal vantagem dos decorators stage 3 é que podemos usar
     * o context.addInitializer, que é um método que recebe uma função (NÃO ARROW FUNCTION)
     * e adiciona essa função no nosso construtor, seria como se a linha dentro da função
     * fosse adicionada no final do seu constructor()
     */
    context.addInitializer(function () {
      // É como se esta linha fosse definida no final do construtor
      Object.defineProperty(
        /* Este this é o contexto da CLASSE */ this,
        /* Neste contexto, o name é o nome da propriedade */ context.name,
        {
          // writable: false, /* Podemos fazer dessa forma sem ter o erro direto */
          set: function (value) {
            throw new Error(
              `Não é possível setar a propriedade readonly ${String(context.name)} para ${value}. A propriedade é somente leitura`,
            );
          },
        },
      );
    });
  }

  class Config {
    @readonly
    apiUrl = "https://api.meusite.com";
  }

  const c = new Config();
  console.log(c.apiUrl);
  // Descomente a linha abaixo para ter um erro
  // c.apiUrl = "blog.lsantos.dev"; // Não altera
  // console.log(c.apiUrl); // Linha morta
}

// DECORATOR FACTORIES
{
  /**
   * Podemos passar parâmetros para nossos decorators, mas para isso precisamos
   * que eles tenham uma espécie de factory method para poder retornar a função correta
   */
  function debug(prefix = "[LOG]") {
    return function decoratorReal(
      value: Function,
      context: ClassMethodDecoratorContext,
    ) {
      if (context.kind !== "method") {
        throw new Error("debug só pode decorar métodos");
      }

      return function metodoSubstituto(...args: any[]) {
        console.log(`${prefix} Chamando ${String(context.name)} com:`, args);
        // @ts-expect-error this terá o tipo any aqui porque não temos como tipar esse valor
        const result = value.apply(this, args);
        console.log(`${prefix} Resultado:`, result);
        return result;
      };
    };
  }

  class MathOps {
    @debug() // Sem propriedades
    sum(a: number, b: number) {
      return a + b;
    }

    @debug("[TRACE]")
    subtract(a: number, b: number) {
      return a - b;
    }
  }

  new MathOps().sum(2, 3);
  new MathOps().subtract(2, 3);
}

// DECORATOR METHODS
{
  /**
   * Decorators também podem ter métodos
   * ao invés de retornarem funções diretas
   * o decorator pode ser uma classe que tem
   * um método que retorna um decorator
   */

  // Exemplo do 2ality.com, um coletor de instâncias
  class InstanceCollector {
    instances = new Set();
    install(value: UmaClasse, { kind }: ClassDecoratorContext) {
      if (kind === "class") {
        const _this = this;
        return function (...args: any[]) {
          const inst = new value(...args);
          _this.instances.add(inst);
          return inst;
        } as unknown as UmaClasse;
      }
    }
  }

  const collector = new InstanceCollector();

  // Experimente remover .bind(collector)
  @collector.install.bind(collector)
  class MyClass {}

  const inst1 = new MyClass();
  const inst2 = new MyClass();
  const inst3 = new MyClass();

  // Vamos ter um erro aqui a não ser que explicitamente façamos .bind(collector)
  // Ou então mudemos o tipo de função de InstanceCollector#install para uma arrow function
  console.log(collector.instances);
}

// EXEMPLO ÚTIL: Bound
{
  /**
   * Para resolver o problema que tivemos anteriormente
   * vamos fazer um decorator novo chamado Bound
   * Essencialmente o que ele faz é executar um .bind(this)
   * diretamente no construtor, garantindo que qualquer método
   * mesmo quando executado fora da sua classe principal
   * esteja alinhado com o `this` da instancia de onde veio
   */
  function bound(_original: any, context: ClassMethodDecoratorContext) {
    const methodName = context.name;
    if (context.private) {
      throw new Error(`Não podemos decorar métodos privados`);
    }
    context.addInitializer(function (this: any) {
      this[methodName] = this[methodName].bind(this);
    });
  }

  // Exemplo do 2ality.com, um coletor de instâncias
  class InstanceCollector {
    instances = new Set();
    @bound /* Garantimos que o this do install vai ser sempre collector */
    install(value: UmaClasse, { kind }: ClassDecoratorContext) {
      if (kind === "class") {
        const _this = this;
        return function (...args: any[]) {
          const inst = new value(...args);
          _this.instances.add(inst);
          return inst;
        } as unknown as UmaClasse;
      }
    }
  }

  const collector = new InstanceCollector();

  @collector.install
  class MyClass {}

  const inst1 = new MyClass();
  const inst2 = new MyClass();
  const inst3 = new MyClass();

  console.log(collector.instances);
}
