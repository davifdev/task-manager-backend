import type {
  BadRequest,
  NotFound,
  Unauthorized,
} from "../../models/http/http.model";

export const unauthorized = (body: Unauthorized) => {
  return {
    statusCode: 401,
    body,
  };
};

export const badRequest = (body: BadRequest) => {
  return {
    statusCode: 400,
    body,
  };
};

export const notFound = (body: NotFound) => {
  return {
    statusCode: 404,
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

export const ok = <T>(body: T) => {
  return {
    statusCode: 200,
    body,
  };
};
