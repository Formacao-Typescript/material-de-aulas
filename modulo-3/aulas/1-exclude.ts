{
    /**
     * Exclude vai remover um conjunto de outro conjunto
     * Ou seja, ele vai olhar o primeiro tipo e remover
     * todos os valores que estão na união de exclusão
     */

    type Luzes = 'Amarelo' | 'Vermelho' | 'Verde'
    type LuzesParada = Exclude<Luzes, 'Verde'> // Amarelo | Vermelho
    type LuzesSeguir = Exclude<Luzes, 'Amarelo' | 'Vermelho'> // Verde

    /**
     * O Exclude não funciona diretamente em objetos (veja o omit e pick)
     * somente em uniões de primitivos
     */
    interface Funcionario {
        nome: string
        idade: number
        id: string
        cracha: number
    }

    // Aqui o tipo continua sendo a interface
    type NaoFunciona = Exclude<Funcionario, 'cracha'>

    // Para que ele funcione na interface temos que extrair as chaves
    type FuncionarioChaves = keyof Funcionario
    type FuncionarioSemCracha = Exclude<FuncionarioChaves, 'cracha'>

    // COMO FUNCIONA POR BAIXO DOS PANOS?
    type exclude<Base, Exclusao> = Base extends Exclusao ? never : Base
    type LuzesParada2 = exclude<Luzes, 'Verde'>
    type LuzesSeguir2 = exclude<Luzes, 'Amarelo' | 'Vermelho'>
}