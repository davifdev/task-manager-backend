export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type BodyParamsCreateUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginParams = {
  email: string;
  password: string;
};
