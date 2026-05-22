import type { BadRequest } from "../models/http/http.model";

export const badRequest = (body: BadRequest) => {
  return {
    statusCode: 400,
    body,
  };
};

export const serverError = () => {
  return {
    statusCode: 500,
    body: { message: "Internal Server Error" },
  };
};

export const create = <T>(body: T) => {
  return {
    statusCode: 201,
    body,
  };
};
