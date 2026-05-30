export class UserNotFoundError extends Error {
  constructor(email: string) {
    super(`User with email ${email} not found.`);
  }
}
export class EmailOrPasswordIsInvalid extends Error {
  constructor() {
    super("Email or password is invalid");
  }
}
export class TaskNotFound extends Error {
  constructor() {
    super("task is not found");
  }
}
