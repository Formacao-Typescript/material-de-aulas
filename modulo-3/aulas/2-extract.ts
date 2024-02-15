{
    /**
     * Extract vai extrair um conjunto de outro conjunto
     * Ou seja, ele vai olhar o primeiro tipo e buscar
     * todos os valores que estão na união de extração
     * É o oposto do exclude
     */

    type Luzes = 'Amarelo' | 'Vermelho' | 'Verde'
    type LuzesParada = Extract<Luzes, 'Amarelo' | 'Vermelho'> // Amarelo | Vermelho
    type LuzesSeguir = Extract<Luzes, 'Verde'> // Verde

    /**
     * O Extract não funciona diretamente em objetos (veja o omit e pick)
     * somente em uniões de primitivos
     */
    interface Funcionario {
        nome: string
        idade: number
        id: string
        cracha: number
    }

    // Aqui o tipo é never, porque cracha não foi encontrado na interface
    type NaoFunciona = Extract<Funcionario, 'cracha'>

    // Para que ele funcione na interface temos que extrair as chaves
    type FuncionarioChaves = keyof Funcionario
    type FuncionarioCracha = Extract<FuncionarioChaves, 'cracha'>

    // COMO FUNCIONA POR BAIXO DOS PANOS?
    type extract<Base, Exclusao> = Base extends Exclusao ? Base : never
    type LuzesParada2 = Extract<Luzes, 'Amarelo' | 'Vermelho'>
    type LuzesSeguir2 = Extract<Luzes, 'Verde'>
}