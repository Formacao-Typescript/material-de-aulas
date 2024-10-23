{
    /**
     * Um outro tipo de union específico que vale a pena comentar
     * é a Discriminated Union, esse é um dos tipos mais importantes do TS
     * porque ele permite que você faça um narrowing direto no seu objeto
     */

    /**
     * A ideia da Discriminated Union é que você precisa ter objetos
     * que possuem pelo menos um campo em comum que seja uma constante
     * por exemplo, o caso do próprio Zod. Quando temos um safeParse,
     * o Zod nos retorna uma Discriminated Union que poder ser um erro
     * ou um sucesso.
     * Esse é o tipo simplificado que é retornado pelo zod, veja a documentação:
     * https://zod.dev/?id=safeparse
    */
    type ZodSuccess<T = any> = { success: true, data: T }
    // É importante perceber que em ambas as linhas, a prop success é constante
    type ZodError = { success: false, error: { message: string } }
    type MaybeError<T> = ZodSuccess<T> | ZodError

    const dado: MaybeError<{ result: 'aqui o resultado' }> = {} as MaybeError<any>

    // Agora se formos printar alguma propriedade desse tipo, vamos apenas ter success
    dado.success // não temos nenhuma das outras porque não sabemos se é erro ou não

    // Temos que fazer um narrowing que vai nos apontar para o tipo correto
    if (dado.success) {
        // O tipo aqui agora é ZodSuccess do T que passamos
        const resultado = dado.data
        console.log(resultado.result)
    }

    if (!dado.success) {
        // O tipo aqui é ZodError
        console.log(dado.error.message)
    }
}

{
    /**
     * Um uso comum dessas unions é para poder representar estados diversos
     * de uma mesma função, geralmente para chamadas externas, como APIs
     * onde temos um estado pendente, um estado de erro e outro de sucesso
     * Mas podemos usar isso também para definir diversos tipos de objetos
     * de acordo com um tipo em comum.
     */

    /**
     * Nesse exemplo temos um objeto que pode mudar de acordo com o 
     * tipo de fluxo que estamos seguindo
     */

    // Temos as propriedades base em todos os fluxos
    interface BaseFlow {
        createdAt: Date
        username: string
        isActive: boolean
        flowType: string
    }

    // Para um determinado fluxo temos essas propriedades
    interface AutoFlow extends BaseFlow {
        flowType: 'auto'
        jobName: string
        runAt: Date
        // Veja que result também é uma Discriminated union
        result: {
            message: string
            success: true
        } | { error: string, success: false }
    }

    // Para outro fluxo temos outras
    interface ManualFlow extends BaseFlow {
        flowType: 'manual'
        agentName: string
        finalDecision: 'Approved' | 'Reproved'
        customerId: string
        evidence: Uint8Array
    }

    // Aqui unimos as duas
    type ApprovalFlow = ManualFlow | AutoFlow

    const flow: ApprovalFlow = {} as ApprovalFlow

    // veja que podemos printar todas as propriedades comuns
    const { createdAt, flowType, isActive, username } = flow

    switch (flowType) {
        // Temos completion aqui também
        case 'manual':
            // O flow aqui agora tem todas as propriedades de ManualFlow
            console.log(flow.agentName)
            break
        case 'auto':
            // Aqui já temos propridades do outro flow
            console.log(flow.runAt)
            // E podemos fazer nosso narrowing
            if (!flow.result.success) {
                throw new Error(flow.result.error)
            }
            console.log(flow.result.message)
            break
    }
}

