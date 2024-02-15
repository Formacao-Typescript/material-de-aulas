{
    /**
     * Para falar do NonNullable, vamos relembrar
     * nosso tipo Nullable<T>
     */
    type Nullable<T> = T | null | undefined
    type NullableString = Nullable<string>

    /**
     * NonNullable vai excluir tudo que for null ou undefined
     * do tipo passado
     */
    type NonNullableString = NonNullable<NullableString> // String


    // COMO FUNCIONA?
    // NonNullable usa o Exclude por baixo dos panos
    type nonNullable<T> = Exclude<T, null | undefined>
    type NonNullableNumber = nonNullable<Nullable<number>> // Number

    // Em interfaces, ele vai garantir que a variável não seja nula
    interface Usuario {
        nome: string
    }

    type NullUser = nonNullable<Nullable<Usuario>>
}