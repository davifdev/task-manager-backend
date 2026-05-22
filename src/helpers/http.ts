import type { BadRequest, ServerError } from "../models/http/http.model";

export const badRequest = (body: BadRequest) => {
  return {
    statusCode: 400,
    body,
  };
};

export const serverError = (body: ServerError) => {
  return {
    statusCode: 500,
    body,
  };
};

export const create = <T>(body: T) => {
  return {
    statusCode: 201,
    body,
  };
};
