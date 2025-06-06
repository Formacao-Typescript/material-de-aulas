{
    /**
    * Implemente uma função chamada `assoc` que faz algo parecido ao `R.assoc` do Ramda.
    * Ela receberá um objeto, uma chave e um valor, e retornará um novo objeto com a chave
    * selecionada associada ao valor fornecido. Um exemplo de uso seria:
    *
    * const obj = { name: 'Lucas', age: 30 };
    * const newObj = assoc(obj, 'age', 31);
    * console.log(newObj); // { name: 'Lucas', age: 31 }
    *
    * A função deve ser genérica e funcionar com qualquer tipo de objeto.
    */
    function assoc<Objeto, Chave extends keyof Objeto>(
        obj: Objeto,
        key: Chave,
        value: Objeto[Chave]) {
        return { ...obj, [key]: value }
    }

    const obj = { name: 'Lucas', age: 30 };
    const newObj = assoc(obj, 'age', 31);
    console.log(newObj); // { name: 'Lucas', age: 31 } 
}
