// Apenas definimos uma classe aqui porque vamos usar ela em vários exemplos
type Constructor<T = {}> = new (...args: any[]) => T;

{
    // Desde a versão 2.2, o TypeScript suporta um padrão de projeto chamado Mixin.
    // Mixin é uma forma de reutilizar código em várias classes sem usar herança direta
    // Pense que um mixin é uma espécie de herança feita "na mão"
    // Por exemplo, vamos pegar um mixin que adiciona um timestamp na classe


    function Timestamped<ClasseBase extends Constructor>(classeBase: ClasseBase) {
        return class extends classeBase {
            timestamp = Date.now();
        };
    }

    /**
     * Essencialmente, um mixin é uma função que faz 4 coisas:
     * 1 - Leva o construtor de uma classe que queremos estender (não a instância!)
     * 2 - Declara uma nova classe anonima que estende a classe que passamos
     * 3 - Adiciona novos membros a essa classe ou nova funcionalidade
     * 4 - Retorna a nova classe
     */

    // Podemos usar um mixin da seguinte forma


    // Primeiro definimos uma classe

    class Evento {
        constructor(public name: string) { }
    }

    // Agora vamos adicionar o timestamp a essa classe
    const TimestampedEvento = Timestamped(Evento);
    const evento = new TimestampedEvento("Evento");
    console.log(evento.timestamp); // 1625113162204

    // Adicionamos funcionalidade a uma classe já existente sem precisar tocar no código dela
    // nem mesmo para adicionar uma extensão
}

{
    // Mixins podem ser bastante complexos, podendo conter construtores, métodos e muito mais.
    // Por exemplo, um mixin que não só adiciona uma propriedade nova, mas que adiciona um
    // novo parâmetro de criação
    function Tagged<ClasseBase extends Constructor>(classeBase: ClasseBase, brand: string) {
        return class extends classeBase {
            tag: string
            // Todo construtor de um mixin só pode conter um parâmetro ...args: any[]
            constructor(...args: any[]) {
                super(...args);
                this.tag = brand;
            }
        };
    }

    class Produto {
        constructor(public name: string) { }
    }

    const Tenis = Tagged(Produto, 'Calçado')
    const tenis = new Tenis("Nike")
    console.log(tenis.tag) // Calçado


}

{
    // Podemos também definir uma tag sem precisar passar no construtor do mixin
    function Tagged<ClasseBase extends Constructor>(classeBase: ClasseBase) {
        return class extends classeBase {
            tag: string | null
            // Todo construtor de um mixin só pode conter um parâmetro ...args: any[]
            constructor(...args: any[]) {
                super(...args);
                this.tag = null;
            }
        };
    }

    class Produto {
        constructor(public name: string) { }
    }

    const Tenis = Tagged(Produto)
    const tenis = new Tenis("Nike")
    tenis.tag = 'Calçado'
}

{
    // Mixins podem ter métodos, por exemplo, um método que define se está ativo ou desativado
    function Ativavel<ClasseBase extends Constructor>(classeBase: ClasseBase) {
        return class extends classeBase {
            ativo = true
            desativar() {
                this.ativo = false
            }
            ativar() {
                this.ativo = true
            }
        };
    }

    class Evento {
        constructor(public nome: string) { }
    }

    const EventoAtivavel = Ativavel(Evento)
    const evento = new EventoAtivavel("Evento")
    console.log(evento.ativo) // true
    evento.desativar()
    console.log(evento.ativo) // false
}


{
    // A vantagem de mixins é que podemos compor todos esses mixins de forma que eles se tornam uma única
    // classe com todas as funcionalidades
    function Ativavel<ClasseBase extends Constructor>(classeBase: ClasseBase) {
        return class extends classeBase {
            ativo = true
            desativar() {
                this.ativo = false
            }
            ativar() {
                this.ativo = true
            }
        };
    }
    function Tagged<ClasseBase extends Constructor>(classeBase: ClasseBase) {
        return class extends classeBase {
            tag: string | null
            // Todo construtor de um mixin só pode conter um parâmetro ...args: any[]
            constructor(...args: any[]) {
                super(...args);
                this.tag = null;
            }
        };
    }
    function Timestamped<ClasseBase extends Constructor>(classeBase: ClasseBase) {
        return class extends classeBase {
            timestamp = Date.now();
        };
    }

    class Evento {
        constructor(public nome: string) { }
    }

    const EventoCompleto = Ativavel(Tagged(Timestamped(Evento)))
    const evento = new EventoCompleto("Evento")
    console.log(evento.ativo) // true
    evento.desativar()
    console.log(evento.ativo) // false
    evento.tag = 'Evento'
    console.log(evento.tag) // Evento
    console.log(evento.timestamp) // 1625113162204
}
