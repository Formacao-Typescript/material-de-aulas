{
    const obj: object = { }
    const obj2: object = null

    obj.foo
    obj2.bar

    obj.toString()
    const chaves = Object.keys(obj)
}

{
    const obj: Object = { }
    const obj2: Object = null

    const obj3: Object = new Object()
    const obj4: Object = new Date()
    const obj5: Object = new String()
    const obj6: Object = new Number()
    const obj7: Object = new Function()
    const obj8: Object = new Array()

    obj3.toString()
    obj4.toISOString()
}