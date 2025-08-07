// Aqui temos a classe com a implementação dos seus métodos
export class UserService {
  #apiUrl; // pripriedade privada
  constructor(apiUrl) {
    this.#apiUrl = apiUrl;
  }
  getUser(id) {
    return fetch(`${this.#apiUrl}/users/${id}`);
  }
}
