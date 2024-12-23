import { randomUUID } from "crypto"

{
    /**
     * Branded types são uma forma incrível de adicionar segurança aos tipos
     * sem precisar adicionar código no runtime.
     * Eles também podem ser chamados de Tagged Types
     * A ideia por trás dos branded types é que eles podem ser usados para 
     * distinguir tipos que tem o mesmo modelo base, mas diferentes semânticas
     * Por exemplo, um ID é uma string mas ainda sim é do tipo ID e não pode
     * Ser usado como uma string normal em outros lugares
     */

    /**
     * O branded type não é um tipo nativo do TypeScript
     * Você precisa criar um branded type através de intersecção de um
     * tipo com um símbolo único, que pode ser um symbol em si ou uma propriedade
     * oculta
     */
    type Brand<T, B> = T & { readonly __brand: B }
    type BrandSymbol<T> = T & { readonly __brand: unique symbol }

    // Agora podemos criar um branded type, por exemplo para um ID
    type ID = Brand<string, 'ID'>

    // @ts-expect-error stirngs comuns não podem ser associadas
    const userId: ID = 'strings não são IDs'
    // Precisamos primeiro fazer o casting para ID
    const castID: ID = 'com cast podemos' as ID

    // Da mesma forma, se não quisermos especificar o brand
    // Podemos deixar o TS fazer isso por nós
    type UUID = BrandSymbol<string>
    type ULID = BrandSymbol<string>

    const uuid: UUID = randomUUID() as UUID
    // @ts-expect-error Precisamos de um casting
    const ulid: ULID = 'não é ID'
}

// Vamos definir o tipo globalmente aqui para podermos usar sem redefinir
type BrandSymbol<T> = T & { readonly __brand: unique symbol }
{
    /**
     * MAS ONDE USAR BRANDED TYPES?
     *
     * Branded types brilham onde temos o mesmo tipo primitivo
     * mas com significados diferentes, por exemplo, moedas
     * Todas elas podem ser representadas com uma string ou um numero
     * mas um Euro é diferente de um Dólar
     */
    type EUR = BrandSymbol<string>
    type USD = BrandSymbol<string>


    //Imagine que queremos uma função que converte de Euros para Dólares
    function convertEurUsd(eur: EUR): USD {
        // Perceba que precisamos fazer o casting para USD
        return (Number(eur) * 1.023).toFixed(2) as USD
    }

    const euros: EUR = '100' as EUR
    const dols: USD = convertEurUsd(euros)

    /**
     * Não podemos receber outra string que não sejam Euros
     * nessa função, o que faz com que tenhamos os tipos mais seguros
     * uma vez que só algumas funções podem produzir um tipo EUR
     * (vamos ver mais sobre assertion functions mais para frente)
     */
}

{
    /**
     * Para criarmos branded types, ou seja, para produzirmos esses tipos
     * precisamos de uma função específica que recebe o tipo primitivo base
     * e retorna o tipo específico, tornando a gestão dos identificadores muito
     * mais fácil
     */
    type Email = BrandSymbol<string>
    function validaEmail(s: string): Email {
        if (!s.includes('@')) throw new Error('Email inválido')
        // Essa é uma conversão explícita feita para uma brand
        return s as Email
    }
    const email = validaEmail('hello@lsantos.dev') // meu tipo é especificamente um email

    /**
    * Da mesma forma, podemos usar braded types para criar
    * uma modelagem mais específica de domínio, por exemplo
    * um Euro é um número positivo apenas
    */
    type EUR = BrandSymbol<number>
    type Positivo<T> = BrandSymbol<T>

    function checkPositivo(n: EUR): Positivo<EUR> {
        if (n < 0) throw new Error('número não é positivo')
        return n as Positivo<EUR>
    }

    // Veja que esse é um EURO positivo
    // então podemos ter branded types dentro de branded types
    const euros = checkPositivo(100 as EUR)

    // -------------------------- //

    // Vamos criar uma nova função mais genérica
    type USD = BrandSymbol<string>

    function checkPositivoGenerico<T>(n: number): Positivo<T> {
        if (n < 0) throw new Error('número não é positivo')
        return n as unknown as Positivo<T>
    }

    const usd = checkPositivoGenerico<USD>(100)
    const eur = checkPositivoGenerico<EUR>(100)

    // @ts-expect-error aqui esperamos um euro positivo e estamos mandando um USD
    const eurosErrado: Positivo<EUR> = usd

}

{
    /**
     * Podemos transformar nossos branded types em algo genérico
     */
    type Brand<T, B extends string> = T & { __brand: B }
    type Moeda<T extends string> = Brand<number, T>;

    type USD = Moeda<"USD">;
    type EUR = Moeda<"EUR">;

    function converterParaUSD(amount: EUR): USD {
        return (amount * 1.1) as USD
    }

    const euros = 100 as EUR;
    const dollars = converterParaUSD(euros);

    console.log(`Convertido: $${dollars}`);
}

/**
 * Branded types são ótimos, mas sozinhos eles acabam tendo pouca funcionalidade
 * idealmente, você deveria usar branded types com assertion functions e type guards
 * que vamos ver nas próximas aulas
 */
