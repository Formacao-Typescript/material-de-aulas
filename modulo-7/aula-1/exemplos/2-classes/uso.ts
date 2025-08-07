import { UserService } from "./classe";

const service = new UserService("https://lsantos.dev");
service.getUser(1).then(console.log);

// @ts-expect-error Propriedade privada
service.apiUrl;
