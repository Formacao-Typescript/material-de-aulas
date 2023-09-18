{
    const strings: string[] = ['a', 'n']
    const numbers: Array<number> = [1, 2, 3]
    const booleans: boolean[] = [true, false]

    const anys: any[] = [1, true, 'string', undefined]
    const unknowns: unknown[] = [1, 'a', true]
    const objects: object[] = [{a: 1}, {b: 2}]
    const pessoas: {name: string}[] = [
        {name: 'lucas'},
        {name: 'Ana'}
    ]

    const arrays: string[][] = [['a', 'b'], ['a']]
    const generics: Array<Array<string>> = [['a', 'b'], ['a']]

    generics.push(1)

    const nomes = ['joao', 'maria']
}

{
    const numbers: number[] = [1,2,3]
    numbers.push(1)
    numbers.pop()
    numbers[0]
}

{
    const array: (string|number|null)[] = [1, 'a', null]
    array.push(1)
    array.push('b')

    const array2: Array<string|number|null> = [1, 'a', null]
}

{
    const readOnly: readonly string[] = ['a', 'b']
    readOnly.push('a')
    readOnly[0]
}

{
    type StringOrNumber = (string | number)[]
    const arr: StringOrNumber = [1, 'a']
    const arr2: StringOrNumber[] = [[1], ['a']]
    const arr3: (string | number)[][] = [[1], ['a']]
}