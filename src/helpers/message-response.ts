import { badRequest, notFound } from "./http";

export const idIsInvalidResponse = () => {
  return badRequest({
    message: "the provided UUID is invalid.",
  });
};

export const someFieldIsNotAllowedResponse = () => {
  return badRequest({
    message: "Some provided field is not allowed",
  });
};

export const titleIsInvalidResponse = () => {
  return badRequest({
    message: "The title must be a string",
  });
};

export const timeIsInvalidResponse = () => {
  return badRequest({
    message: "The time must be a morning, afternoon or evening",
  });
};

export const statusIsInvalidResponse = () => {
  return badRequest({
    message: "The status must be a is_pending, in_progress or is_completed",
  });
};

export const descriptionIsNotString = () => {
  return badRequest({
    message: "The description must be a string",
  });
};

export const descriptionIsInvalidResponse = () => {
  return badRequest({
    message: "The description must be at least 3 characters",
  });
};

export const taskNotFoundResponse = () => {
  return notFound({
    message: "task not found",
  });
};
