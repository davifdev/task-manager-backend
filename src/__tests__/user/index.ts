import { faker } from "@faker-js/faker";
import type {
  BodyParamsCreateUser,
  UserType,
} from "../../models/users/create-user.model";

export const user: UserType = {
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const userParams: BodyParamsCreateUser = {
  email: faker.internet.email(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  password: faker.internet.password(),
};
