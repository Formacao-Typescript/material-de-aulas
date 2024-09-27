/**
* Esta é uma pequena lista de exercícios que vai te ajudar a entender melhor os conceitos de herança e implementações no TypeScript.
*/

// Exercicio 1: Crie uma interface Pessoa com "nome" e "idade", e uma outra interface "Funcionário" que estenda a interface Pessoa e tenha "salário" e "cargo". Depois crie um objeto do tipo "Funcionário" e imprima no console.

{
    interface Pessoa {
        nome: string;
        idade: number;
    }

    interface Funcionario extends Pessoa {
        salario: number;
        cargo: string;
    }

    const funcionario: Funcionario = {
        nome: 'João',
        idade: 30,
        salario: 2000,
        cargo: 'Desenvolvedor'
    }

    console.log(funcionario);
}


// Exercicio 2: Use a mesma classe Pessoa anteriormente, mas agora crie uma outra classe gerente que tem uma propriedade "tamanhoTime"
// que deve estender tanto pessoa quanto funcionario, depois crie uma função que leve como parâmetro qualquer pessoa e imprima no console
// o nome e a idade

{
    interface Pessoa {
        nome: string;
        idade: number;
    }

    interface Funcionario extends Pessoa {
        salario: number;
        cargo: string;
    }
    interface Gerente extends Funcionario {
        tamanhoTime: number;
    }

    function printarPessoa(pessoa: Pessoa) {
        console.log(pessoa.nome, pessoa.idade);
    }
}

// Exercicio 3: Defina uma interface Carro com propriedades marca e modelo obrigatórias. Estenda essa interface com uma interface CarroEletrico
// que deve ter uma propriedade bateria opcional. Depois crie objetos para as duas interfaces

{
    interface Carro {
        marca: string;
        modelo: string;
    }

    interface CarroEletrico extends Carro {
        bateria?: number;
    }

    const carro: Carro = {
        marca: 'Ford',
        modelo: 'Fiesta'
    }

    const carroEletrico: CarroEletrico = {
        marca: 'Tesla',
        modelo: 'Model S',
        bateria: 100
    }
}

// Exercicio 4: Crie uma interface "Forma" com uma propriedade "nome". Estenda essa classe para Circulo e Quadrado, para a interface Circulo, adicione a propriedade "raio" e para o quadrado adicione a propriedade "lado". Depois crie objetos para as duas interfaces e um array que receba tanto circulo quanto quadrado.

{
    interface Forma {
        nome: string;
    }
    interface Circulo extends Forma {
        raio: number;
    }
    interface Quadrado extends Forma {
        lado: number;
    }
    const circulo: Circulo = {
        nome: 'Circulo',
        raio: 10
    }
    const quadrado: Quadrado = {
        nome: 'Quadrado',
        lado: 10
    }

    const formas: Forma[] = [circulo, quadrado];
}

// Extra: Adicione um método "calcularArea" para as interfaces Circulo e Quadrado. O método deve retornar a área da forma geométrica.

{
    interface Forma {
        nome: string;
        calcularArea(): number;
    }
    interface Circulo extends Forma {
        raio: number;
    }
    interface Quadrado extends Forma {
        lado: number;
    }
    const circulo: Circulo = {
        nome: 'Circulo',
        raio: 10,
        calcularArea() {
            return Math.PI * this.raio ** 2;
        }
    }
    const quadrado: Quadrado = {
        nome: 'Quadrado',
        lado: 10,
        calcularArea() {
            return this.lado ** 2;
        }
    }
}

// Exercício 5: Crie uma interface chamada Loggable, ela precisa ter uma função "log". Depois estenda essa interface em uma classe "PersonLogger" que recebe uma interface
// do tipo "Pessoa" que tivemos antes e implemente a funmção corretamente

{
    interface Pessoa {
        nome: string;
        idade: number;
    }
    interface Loggable {
        log(): void;
    }
    class PersonLogger implements Loggable {
        constructor(private pessoa: Pessoa) { }
        log() {
            console.log(this.pessoa.nome, this.pessoa.idade);
        }
    }
}

// Exercicio 6: Crie uma interface Usuario, com "username" de propriedade. Estenda essa interface para "Admin" e "Convidado" adicionando propriedades como "nivelAdmin"
// e "idConvidado". Depois crie uma interface "SuperUser" mesclando essas duas e crie um objeto com ela

{
    interface Usuario {
        username: string;
    }
    interface Admin extends Usuario {
        nivelAdmin: number;
    }
    interface Convidado extends Usuario {
        idConvidado: number;
    }
    interface SuperUser extends Admin, Convidado { }
    const superUser: SuperUser = {
        username: 'admin',
        nivelAdmin: 1,
        idConvidado: 1
    }
}

// Exercício 7: Crie duas interfaces, TemEndereco e TemContato, e estenda-as usando tipos de interseção em uma interface PessoaComContato. Instancie um objeto que implemente PessoaComContato.

{
    interface TemEndereco {
        endereco: string;
    }
    interface TemContato {
        email: string;
    }
    interface PessoaComContato extends TemEndereco, TemContato { }
    const pessoaComContato: PessoaComContato = {
        endereco: 'Rua 1',
        email: ''
    }
}

// Exercicio 8: Defina uma interface genérica RespostaApi<T> com as propriedades status e dados. Estenda-a em RespostaSucesso e RespostaErro, cada uma adicionando propriedades específicas para sucesso ou erro. Crie um objeto para ambos os tipos.

{
    interface RespostaApi<T> {
        status: number;
        dados: T;
    }
    interface RespostaSucesso<T> extends RespostaApi<T> {
        sucesso: boolean;
    }
    interface RespostaErro<T> extends RespostaApi<T> {
        erro: string;
    }
    const respostaSucesso: RespostaSucesso<number> = {
        status: 200,
        dados: 1,
        sucesso: true
    }
    const respostaErro: RespostaErro<string> = {
        status: 404,
        dados: 'Não encontrado',
        erro: 'Not Found'
    }
}

// Exercicio 9: Crie uma interface NoArvore representando um nó de árvore, que tem um valor e um array de nós filhos, cada nó filho é também um nó da árvore. Estenda essa interface para incluir um método que imprime a estrutura da árvore e implemente uma classe chamada Arvore que implemente essa interface

{
    interface NoArvore {
        valor: number;
        filhos: NoArvore[];
        print(): void;
    }
    class Arvore implements NoArvore {
        constructor(public valor: number, public filhos: NoArvore[]) { }
        print() {
            console.log(this.valor);
            for (const filho of this.filhos) {
                filho.print()
            }
        }
    }
}

// Exercício 10: Crie uma interface Forma que contém "nome" e um método abstrato "area". Crie três classes Círulo, Quadrado e Triangulo que implemente essas interfaces
// depois implemente essas classes e crie objetos para cada uma, crie um array que receba qualquer um destes objetos e depois faça uma iteração mostrando a area no console

{
    interface Forma {
        nome: string;
        area(): number;
    }
    class Circulo implements Forma {
        constructor(public raio: number) { }
        nome = 'Circulo';
        area() {
            return Math.PI * this.raio ** 2;
        }
    }
    class Quadrado implements Forma {
        constructor(public lado: number) { }
        nome = 'Quadrado';
        area() {
            return this.lado ** 2;
        }
    }
    class Triangulo implements Forma {
        constructor(public base: number, public altura: number) { }
        nome = 'Triangulo';
        area() {
            return (this.base * this.altura) / 2;
        }
    }
    const circulo = new Circulo(10);
    const quadrado = new Quadrado(10);
    const triangulo = new Triangulo(10, 5);
    const formas: Forma[] = [circulo, quadrado, triangulo];
    for (const forma of formas) {
        console.log(forma.area());
    }
}

// Exercicio 11: Dada as seguintes classes, identifique quais propriedade/métodos podem ser separados em interfaces separadas e implementadas a parte

{
    abstract class Animal {
        dataCriacao: Date = new Date();
        dataAtualizacao: Date = new Date();

        constructor(public nome: string, public id: string) { }

        abstract emitirSom(): void;
        abstract mover(): void;
    }

    class Cachorro extends Animal {
        emitirSom() {
            console.log('Au au');
        }
        mover() {
            console.log('Correndo');
        }
        amamentar() {
            console.log('Amamentando');
        }
    }

    class Gato extends Animal {
        emitirSom() {
            console.log('Miau');
        }
        mover() {
            console.log('Correndo');
        }
        amamentar() {
            console.log('Amamentando');
        }
    }

    class Pato extends Animal {
        emitirSom() {
            console.log('Quack');
        }
        mover() {
            console.log('Andando');
        }
        voar() {
            console.log('Voando');
        }
        nadar() {
            console.log('Nadando');
        }
    }
}


// Resposta

{
    interface Animal {
        emitirSom(): void;
        mover(): void;
    }
    interface Ave {
        voar(): void;
    }
    interface Nadador {
        nadar(): void;
    }
    interface Mamifero {
        amamentar(): void;
    }

    abstract class AnimalClass implements Animal {
        dataCriacao: Date = new Date();
        dataAtualizacao: Date = new Date();
        constructor(public nome: string, public id: string) { }
        abstract emitirSom(): void;
        abstract mover(): void;
    }

    class Cachorro extends AnimalClass implements Mamifero {
        emitirSom() {
            console.log('Au au');
        }
        mover() {
            console.log('Correndo');
        }
        amamentar() {
            console.log('Amamentando');
        }
    }

    class Gato extends AnimalClass implements Mamifero {
        emitirSom() {
            console.log('Miau');
        }
        mover() {
            console.log('Correndo');
        }
        amamentar() {
            console.log('Amamentando');
        }
    }

    class Pato extends AnimalClass implements Ave, Nadador {
        emitirSom() {
            console.log('Quack');
        }
        mover() {
            console.log('Andando');
        }
        voar() {
            console.log('Voando');
        }
        nadar() {
            console.log('Nadando');
        }
    }
}
