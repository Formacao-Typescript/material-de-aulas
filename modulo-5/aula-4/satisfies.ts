
/**
 * O operador `satisfies` foi introduzido no TypeScript 4.9
 * e serve para garantir que um valor obedece a um contrato (tipo),
 * sem perder a inferência literal dos valores.
 *
 * Ele é uma forma de validação de tipos sem forçar um cast
 * e sem "afrouxar" a precisão do que está sendo definido.
 */

/**
 * Eu escrevi um artigo explicando o `satisfies` com mais exemplos,
 * pegadinhas e casos de uso reais:
 *
 * 👉 https://lsantos.dev/ts-satisfies
 */
{
    /**
     * Imagine que temos um tipo de configuração esperado:
     */
    type Config = {
        ambiente: 'dev' | 'prod';
        debug: boolean;
    }

    /**
     * Se definirmos um objeto direto sem casting explicito
     * o TS vai forçar aquele tipo, mesmo que esteja errado.
     */
    const configErrado = {
        ambiente: 'deev',
        debug: true,
    } as const // Veja que a string deev está errada, mas o TS não reclama, porque ele não tem como saber!


    /**
     * Podemos fazer um cast explícito para `Config`
     * isso resolve nosso problema criando um erro
     * mas vamos perder a inferência literal dos valores.
     */
    const configComCast = {
        ambiente: 'deev',
        debug: true,
    } as Config;

    /**
     * Já com `satisfies`, o TypeScript valida corretamente,
     * e ainda mantém os valores literais inferidos.
     */
    const configCorreto = {
        ambiente: 'prod',
        debug: false,
    } satisfies Config;

    /**
     * Isso é super útil em situações onde queremos garantir
     * que um objeto cumpre um contrato, mas sem perder a
     * precisão dos valores para validações, autocomplete,
     * narrowings, etc.
     */
}

{
    /**
     * Outro exemplo comum é quando queremos garantir que um mapa
     * de valores obedece a um tipo de chave específica,
     * mas mantendo os valores literais:
     */
    const cores = {
        primária: '#ff0000',
        secundária: '#00ff00',
        terciária: '#0000ff'
    } as const satisfies Record<string, string>;

    /**
     * Aqui o TypeScript garante que todos os valores são `string`,
     * mas `cores.primária` ainda será do tipo `"#ff0000"` — um literal!
     */

    // Isso permite usar narrowing, switch, validações etc.
    type ChaveCor = keyof typeof cores; // "primária" | "secundária" | "terciária"
    type ValorCor = typeof cores[ChaveCor]; // "#ff0000" | "#00ff00" | "#0000ff"

    /**
     * ainda no exemplo de cores, podemos deixar o objeto ainda mais genérico
     * aceitando ou uma string ou uma tupla de numeros
     */
    type Cores = "red" | "green" | "blue";
    type RGB = [red: number, green: number, blue: number];

    // Mesmo se tivermos um erro aqui o TypeScript vai reclamar
    const paleta: Record<Cores, string | RGB> = {
        red: [255, 0, 0],
        green: '#00ff00',
        bleu: [0, 0, 255], // nossa chave está errada
    }

    // Se corrigirmos nosso erro, o TS para de reclamar, mas vamos ter outro problema:
    const paletaCorreta: Record<Cores, string | RGB> = {
        red: [255, 0, 0],
        green: '#00ff00',
        blue: [0, 0, 255], // agora está correto, mas nosso tipo é Record<Cores, string | RGB>
    }

    // Se tentarmos usar um método de um array no red, o TS vai reclamar
    paletaCorreta.green.toUpperCase() // o tipo não existe porque ele não sabe se a propeity é uma string ou um array
    paletaCorreta.red.pop() // o tipo não existe porque ele não sabe se a propeity é uma string ou um array

    /**
     * Ou seja, o que o TS consegue inferir são os métodos que existem em ambos os tipos,
     * no caso, string e array.
     */
    paletaCorreta.green.length; // funciona, porque length existe em ambos os tipos

    /**
     * Para solucionar esse problema temos que dizer para o TS que o tipo atual
     * é uma constante, mas que satisfaz o tipo `Record<Cores, string | RGB>`.
     */
    const paletaSatisfies = {
        red: [255, 0, 0],
        green: '#00ff00',
        blue: [0, 0, 255],
    } satisfies Record<Cores, string | RGB>;

    // Agora o TypeScript sabe que `paletaSatisfies.red` é do tipo `RGB` porque é um tipo inferido como literal
    paletaSatisfies.red.pop(); // funciona, porque o TS sabe que é um array
    paletaSatisfies.green.toUpperCase(); // funciona, porque o TS sabe que é uma string
}

{
    /**
     * O `satisfies` também pode ser usado com enums, objetos imutáveis,
     * e até em arrays, garantindo que elementos seguem o tipo esperado
     * mas, se tivermos um tipo que não seja literal, temos que usar o `as const`
     */
    const niveis = ['junior', 'pleno', 'senior'] as const satisfies readonly string[];

    /**
     * `niveis` agora é inferido como:
     * readonly ['junior', 'pleno', 'senior']
     *
     * e não como `string[]` — ou seja, você mantém os literais e evita erros
     * futuros com validação, autocomplete ou validações dinâmicas.
     */
}
