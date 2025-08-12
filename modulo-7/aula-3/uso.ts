interface User {
  id: number;
  profile: {
    name: string;
    age: number;
  };
}

// Deep partial vem do nosso arquivo `global-helpers.d.ts`
const partialUser: DeepPartial<User> = {
  profile: { name: "Lucas" },
};

// ArrayElement vem do nosso arquivo `global-helpers.d.ts`
type Names = ArrayElement<["Lucas", "João", "Maria"]>;
type Numbers = ArrayElement<readonly number[]>;
type Strings = ArrayElement<string[]>;

type NullableUser = MeusTypes.Nullable<User>;
