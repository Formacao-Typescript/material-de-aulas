// Aqui vamos ter somente a definição dos tipos e nada mais
export class UserService {
  // Propriedade privada com o TypeScript
  private apiUrl: string;
  constructor(apiUrl: string);
  // Veja que não temos nenhuma implementação
  getUser(id: number): Promise<Response>;
}
