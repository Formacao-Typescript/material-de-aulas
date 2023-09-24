{
  // vamos imaginar uma função de log que pode levar três parâmetros
  // o primeiro é uma mensagem, que pode ser uma string ou um objeto
  // se for um objeto, o segundo parâmetro é opcional que é o ID do usuário
  // mas o terceiro sempre é obrigatório que é o nível de log
  interface LogMessage {
    message: string
    userId: number
  }

  enum LogLevel {
    INFO = 'info',
    ERROR = 'error'
  }

  // Então podemos usar as call signatures para poder tipar a função assim
  type LogFunction = {
    (message: string, userId: number, level: LogLevel): void
    (message: LogMessage, level: LogLevel): void
  }

  // Agora podemos declarar uma função que segue essa tipagem
  const log: LogFunction = (message: string | LogMessage, userIdOrLevel: number | LogLevel, level?: LogLevel) => {
    // nossa implementação
  }
  // Percebe que agora, os tipos precisam ser compatíveis com as call signatures
  // mas elas precisam ser compatíveis com todas de uma vez
  // por isso que a mensagem leva a string OU o objeto
  // o userIdOrLevel leva o userId OU o level
  // e o level é opcional porque ele pode existir na primeira call signature
  // mas na segunda não
  // e o userId é obrigatório porque ele existe na segunda call signature e na primeira também

  // agora podemos chamar assim
  log('mensagem', 1, LogLevel.INFO) // ok
  log({ message: 'mensagem', userId: 1 }, LogLevel.INFO) // ok

  // Podemos declara a função também usando named functions
  // mas ai vamos separar em duas partes, a primeira são os overloads
  function LogFunctionNamed(message: string, userId: number, level: LogLevel): void
  function LogFunctionNamed(message: LogMessage, level: LogLevel): void
  // e a segunda é a implementação
  // veja que estamos usando unknown porque não sabemos o tipo
  function LogFunctionNamed(message: unknown, userIdOrLevel: unknown, level?: LogLevel): void {
    // implementação do primeiro overload
    // precisamos checar os tipos
    if (typeof message === 'string' && typeof userIdOrLevel === 'number' && level) {
      // Aqui podemos ter certeza que o userIdOrLevel é um number
      console.log(`Mensagem: ${message}, userId: ${userIdOrLevel}, level: ${level}`)
    } else {
      // Vamos precisar de uma assertion function
      // para poder checar se o message é um LogMessage
      function assertMessage(message: unknown): asserts message is LogMessage {
        if (!message || typeof message !== 'object' || !['userId', 'message'].every((key) => key in message)) {
          throw new Error('Invalid message')
        }
      }

      // e outro para checar se o level é um LogLevel
      function assertLevel(level: unknown): asserts level is LogLevel {
        if (!level || typeof level !== 'string' || !Object.values(LogLevel).includes(level as any)) {
          throw new Error('Invalid level')
        }
      }

      assertMessage(message) // usamos o type guard
      assertLevel(userIdOrLevel) // usamos o type guard
      // aqui temos a implementação do segundo overload
      // sabemos que o message é um objeto
      console.log(`Mensagem: ${message.message}, userId: ${message.userId}, level: ${userIdOrLevel}`)
    }
  }

  // Agora podemos chamar a função assim e veja o intellisense mostrando duas opções
  LogFunctionNamed('message', LogLevel.ERROR) // Vamos ter um erro aqui porque estamos passando string
  LogFunctionNamed('message 1', 1, LogLevel.ERROR) // ok
  LogFunctionNamed({ message: 'message 2', userId: 1 }, LogLevel.ERROR) // ok
  LogFunctionNamed({ message: 'message 2', userId: 1 }, 'outro' as LogLevel) // invalid level
}
