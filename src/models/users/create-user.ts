export type UserType = {
  userId: string;
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
