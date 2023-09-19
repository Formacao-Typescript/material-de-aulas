{
    // uma interface pode ser estendidada por outra interface
    interface Animal {
      nome: string;
      idade: number;
    }
  
    // a gente usa a palavra extends para fazer a extensão
    interface Cachorro extends Animal {
      raca: string;
    }
  
    // agora a nova interface Cachorro tem todos os atributos de Animal
    // mais a raça
    const animal: Cachorro = {
      nome: 'Bob',
      idade: 5,
      raca: 'Labrador'
    }
  
    // porém eu posso associar a interface Cachorro a interface Animal
    // porque Cachorro tem todos os atributos de Animal
    // lembra do structural typing? Isso também é chamado de polimorfismo
    // em orientação a objetos
    const umAnimal: Animal = animal;
  }
  
  // multiplas interfaces
  {
    // uma interface pode extender mais de uma interface
    interface Animal {
      nome: string;
      idade: number;
    }
  
    interface Voador {
      voar(): void; // a gente usa essa notação para dizer que é uma função
    }
  
    interface Nadador {
      nadar(): void;
    }
  
    interface Terrestre {
      andar(): void;
    }
  
    // agora a gente pode criar uma interface que extende todas as outras
    interface Pato extends Animal, Voador, Nadador, Terrestre {
      cor: string;
    }
  
    const Donald: Pato = {
      nome: 'Donald',
      idade: 85,
      cor: 'branco',
      voar: () => {},
      nadar: () => {},
      andar: () => {}
    }
  }
  
  // classes
  {
    // uma interface pode estender uma classe
    // porque, em javascript, toda classe é um objeto
    class Animal {
      public nome: string = '';
      public idade: number = 1;
    }
  
    interface Cachorro extends Animal {
      raca: string;
    }
  
    // agora a interface Cachorro tem todos os atributos de Animal
    // mais a raça
    const animal: Cachorro = {
      nome: 'Bob',
      idade: 5,
      raca: 'Labrador'
    }
  }